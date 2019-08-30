const { fork } = require("child_process");
const path = require("path");
const { writeFileSync } = require("fs");
const tmp = require("tmp-promise");

function format(results) {
  const tmpFile = tmp.fileSync();
  writeFileSync(tmpFile.name, JSON.stringify(results));

  const prog = path.resolve(__dirname, "generator.js");
  const child = fork(prog, [], { detached: true, silent: true });
  child.send(tmpFile.name);
  return "";
}

module.exports = format;
