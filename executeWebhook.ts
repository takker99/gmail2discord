/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
/// <reference types="./deps/gas.d.ts" />

import { ExecuteWebhook } from "./deps/discord.ts";

export const makeExecuteWebhookRequest = (
  webhookURL: string,
  options: ExecuteWebhook,
): GoogleAppsScript.URL_Fetch.URLFetchRequest => {
  // cf. https://github.com/discordeno/discordeno/blob/18.0.1/util/routes.ts#L370-L379
  webhookURL += "?";
  if (options.wait !== undefined) webhookURL += `wait=${options.wait}&`;
  if (options.threadId) {
    webhookURL += `thread_id=${options.threadId}&`;
  }

  const { files, ...withoutFile } = options;

  // cf. https://github.com/discordeno/discordeno/blob/73ec09023e241b26df64ff8770d54f4126211eb0/packages/rest/src/manager.ts#L185

  const payload = files && files.length > 0
    // Use multipart/form-data if options include files
    // File upload is currently not working properly. DO NOT USE.
    ? {
      ...Object.fromEntries(
        files.map((file, i) => [`files[${i}]`, file]),
      ),
      payload_json: Utilities.newBlob(
        JSON.stringify(withoutFile),
        "application/json",
      ),
    }
    : JSON.stringify(withoutFile);

  return {
    method: "post",
    contentType: files && files.length > 0
      ? "multipart/form-data"
      : "application/json",
    payload,
    url: webhookURL,
    muteHttpExceptions: true,
  };
};
