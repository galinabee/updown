"use strict";
const fs = require("fs");
const path = require("path");
const test = require("tape").test;
const Parser = require("../lib/parser.js");

test("tryingToPrint", (t) =>
{
  let musicXML =
    fs.readFileSync(path.resolve(__dirname, "../scores/basic.xml"));
  let parser = Parser(musicXML);

  {
    const actual = parser.parse();
    const expected = "";
    t.deepEqual(actual, expected,
      "tryingToPrint");
  }
  t.end();
});
