/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
/// <reference types="./deps/gas.d.ts" />

import { ExecuteWebhook } from "./deps/discord.ts";

export const makeExecuteWebhookRequest = (
  webhookURL: URL,
  options: ExecuteWebhook,
): GoogleAppsScript.URL_Fetch.URLFetchRequest => {
  // cf. https://github.com/discordeno/discordeno/blob/18.0.1/util/routes.ts#L370-L379
  const url = new URL(webhookURL);
  if (options.wait !== undefined) url.searchParams.set("wait", "true");
  if (options.threadId) {
    url.searchParams.set("thread_id", `${options.threadId}`);
  }

  const payload = options.file
    // if options includes file, use multipart/form-data
    ? {
      ...Object.fromEntries(
        options.file.map((file, i) => [`file${i}`, file]),
      ),
      payload_json: JSON.stringify(options),
    }
    : JSON.stringify(options);

  return {
    method: "post",
    contentType: "application/json",
    payload,
    url: `${url}`,
  };
};
