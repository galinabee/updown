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
    const expected = [ [ "C", 4, 0 ], [ "B", 4, -1 ], [ "G", 5, 0 ] ];
    t.deepEqual(actual, expected,
      "tryingToPrint");
  }
  t.end();
});
