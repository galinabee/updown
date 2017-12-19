"use strict";
// const Toscanini = require("toscanini");

const createParser = (etree) =>
{
  const parser = {};

  parser.parse = () =>
  {
    let pitches = etree.findall(".//pitch");
    const notes = [];

    pitches.forEach((note) =>
    {
      let value = [note._children[0].text, Number(note._children[1].text)];
      notes.push(value);
    });
    return notes;
  };
  return Object.freeze(parser);
}; //createParser

//======================================================================
const elementtree = require("elementtree");
const constructor = (musicxml) =>
  createParser(elementtree.parse(musicxml.toString()));

module.exports = constructor;
