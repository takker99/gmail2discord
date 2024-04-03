# gmail2discoed

Send Gmail messages to your Discord channel using Google Apps Script

# Getting Started

1. Create a new Google Apps Script project at https://script.google.com/
2. Run:

```bash
deno run --allow-net --allow-read --allow-env --allow-run https://raw.githubusercontent.com/takker99/gmail2discord/main/build.ts > main.gs
```

3. Copy the contents of `main.gs` to your Google Apps Script project
4. set `DISCORD_WEBHOOK_URL` in the script properties
5. add cheerio's script
   ID([`1ReeQ6WO8kKNxoaA_O0XEQ589cIrRvEBA9qcWpNqdOP17i47u6N9M5Xh0`](https://github.com/tani/cheeriogs?tab=readme-ov-file#adding-the-library-to-your-project))
   to your project
6. set an trigger to run `hook` function

# Development

If you check typescript files, run:

```bash
deno check --remote main.ts executeWebhook.ts && deno check --remote build.ts deps/*.ts
```
