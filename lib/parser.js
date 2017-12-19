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
      let children = note._children;
      let value = [0, 0, 0];
      children.forEach((child) =>
      {
        if (child.tag === "step")
        {
          value[0] = child.text;
        }
        if (child.tag === "octave")
        {
          value[1] = Number(child.text);
        }
        if (child.tag === "alter")
        {
          value[2] = Number(child.text);
        }
      });

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
