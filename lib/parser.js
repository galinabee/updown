"use strict";
// const Toscanini = require("toscanini");

const createParser = (etree) =>
{
  const parser = {};

  parser.parse = () =>
  {
    let notes = etree.findall(".//pitch");

    return notes;
  };
  return Object.freeze(parser);
}; //createParser

//======================================================================
const elementtree = require("elementtree");
const constructor = (musicxml) =>
  createParser(elementtree.parse(musicxml.toString()));

module.exports = constructor;
