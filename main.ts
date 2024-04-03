/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference types="./deps/gas.d.ts" />
/// <reference types="./deps/cheerio.d.ts" />

import { ExecuteWebhook } from "./deps/discord.ts";
import { makeExecuteWebhookRequest } from "./executeWebhook.ts";

declare const global: Record<string, CallableFunction>;

global.hook = (
  formatMessage: (
    message: GoogleAppsScript.Gmail.GmailMessage,
  ) => ExecuteWebhook,
) => {
  const checked = getChecked();
  // Record the start date and time of the hook
  // Next time, retrieve emails sent or received after this date and time
  setChecked(new Date());
  // Retrieve emails sent or received after the last checked date and time
  const threads = GmailApp.search(`after:${format(checked)}`);

  if (threads.length == 0) {
    console.log("No messages.");
    return;
  }
  console.log(`checking ${threads.length} threads...`);

  const webhook = getWebhookUrl();
  if (!webhook) {
    throw new Error("DISCORD_WEBHOOK_URL is not set");
  }

  const messagesToSend = threads.flatMap((thread) => {
    console.log(`check "${thread.getFirstMessageSubject()}"`);
    return thread.getMessages().flatMap((message) => {
      const posted = message.getDate();
      const log = `${format(posted)}: "${
        message.getPlainBody().slice(0, 10)
      }..."`;
      // ignore draft messages
      if (message.isDraft()) {
        console.log(`[SKIP][DRAFT] ${log}`);
        return [];
      }
      // skip messages already sent
      if (posted.getTime() < checked.getTime()) {
        console.log(`[SKIP] ${log}`);
        return [];
      }
      console.log(`[NEW] ${log}`);
      return message;
    });
  });
  console.log(`send ${messagesToSend.length} messages`);
  if (messagesToSend.length === 0) return;

  const url = new URL(webhook);
  UrlFetchApp.fetchAll(
    messagesToSend
      .sort((a, b) => a.getDate().getTime() - b.getDate().getTime())
      .map((message) => makeExecuteWebhookRequest(url, formatMessage(message))),
  );
};

global.defaultFormatter = (
  message: GoogleAppsScript.Gmail.GmailMessage,
): ExecuteWebhook => {
  const posted = message.getDate();
  const from = message.getFrom();
  const subject = message.getSubject();

  // return an message trimmed the previous mail quote
  const plainBody = trimQuote(message);
  return {
    embeds: [{
      title: subject,
      author: {
        name: from,
      },
      timestamp: posted.toISOString(),
      description: plainBody.slice(0, 2048),
    }],
  };
};

declare const Cheerio: { load: (content: string) => cheerio.CheerioAPI };

/** Remove the quote that appears at the end of the email */
const trimQuote = (message: GoogleAppsScript.Gmail.GmailMessage): string => {
  const html = message.getBody();
  if (message.getPlainBody() === html) {
    // if the mail is plain text, remove the continuous `> ` lines
    return html.replace(/\n\s*>\s?[^\n]+\n\s*>\s?[^\n]+/g, "");
  }
  const $ = Cheerio.load(message.getBody());
  $("html").find(
    ".gmail_quote, #divRplyFwdMsg ~ *, #divRplyFwdMsg, #appendonsend ~ *, #appendonsend, blockquote",
  ).remove();
  // Remove unnecessary line break elements in Outlook HTML emails
  $("html").find(".elementToProof").unwrap("div");
  $("html").find(".elementToProof").each((_, div) => {
    $(div).replaceWith(
      $(`<span>${$(div).text().replace(/^\s+$/, "\n")}</span>`),
    );
  });
  return $("html").end().text().trim();
};
global.trimQuote = trimQuote;

const getWebhookUrl = () => {
  const scriptProperties = PropertiesService.getScriptProperties();
  return scriptProperties.getProperty("DISCORD_WEBHOOK_URL");
};

const getChecked = () => {
  const scriptProperties = PropertiesService.getScriptProperties();
  const checked = scriptProperties.getProperty("CHECKED") || "1680274800000";
  return new Date(parseInt(checked));
};

const setChecked = (date: GoogleAppsScript.Base.Date) => {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("CHECKED", `${date.getTime()}`);
};

const format = (date: GoogleAppsScript.Base.Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
