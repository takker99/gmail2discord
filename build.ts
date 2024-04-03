/// <reference lib="deno.window" />
import { generate } from "./deps/gas-entry-generator.js";
import { build, denoPlugins, stop } from "./deps/esbuild.ts";

const { outputFiles } = await build({
  entryPoints: [new URL("./main.ts", import.meta.url).href],
  target: "es2017", // convert to ES2017, which is supported by Google Apps Script
  bundle: true,
  minify: true,
  write: false,
  plugins: [...denoPlugins()],
});
await stop();
const code = outputFiles[0].text;

const output = generate(code);
console.log(
  `const global=this;\n${output.entryPointFunctions}\n(() => {\n${code}\n})();`,
);
