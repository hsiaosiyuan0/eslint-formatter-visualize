const { file } = require("tmp-promise");
const { compile } = require("handlebars");
const path = require("path");
const { readFile, writeFile } = require("fs").promises;
const open = require("open");
const Base64 = require("js-base64").Base64;

async function gen(dataPath) {
  const data = await readFile(dataPath, { encoding: "utf8" });
  const tmp = await file({ postfix: ".html" });
  const tplSrc = await readFile(path.resolve(__dirname, "index.handlebars"), {
    encoding: "utf8"
  });
  const tpl = compile(tplSrc);
  const html = tpl({ data: Base64.encode(data) });
  await writeFile(tmp.path, html);
  await open(tmp.path);
}

process.on("message", data => gen(data));
