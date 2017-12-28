"use strict";
// const Toscanini = require("toscanini");
function compare(note1, note2)
{
  let pitchComparison = note1[0].localeCompare(note2[0]);
  let octaveComparison = note1[1].localeCompare(note2[1]);
  let alterationComparison = note1[2].localeCompare(note2[2]);


  if (octaveComparison === -1)
  {
    return 1;
  }
  if (octaveComparison === 1)
  {
    return 0;
  }
  // if within the same octave
  if (octaveComparison === 0)
  {
    // if pitch is lower
    if (pitchComparison === -1)
    {
      return 1;
    }
    else if (pitchComparison === 1)
    {
      return 0;
    }
    else if (pitchComparison === 0)
    {
      //check alterationComparison
      if (alterationComparison === -1)
      {
        return 1;
      }
      else if (alterationComparison === 1)
      {
        return 0;
      }
      else if (alterationComparison === 0)
      {
        //we have the same note, let's return down
        return 0;
      }
    }
  }
}

const createParser = (etree) =>
{
  const parser = {};
  const notes = [];

  parser.parse = () =>
  {
    let pitches = etree.findall(".//pitch");

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

  parser.evaluate = (notes) =>
  {
    // const comparison = [];
    let tempNote = null;

    notes.forEach((note) =>
    {
      if (tempNote === null)
      {
        note = tempNote;
      }
      else
      {
        // go through, compare and add
        if (tempNote !== null)
        {
          compare(note, tempNote);
        }
      }
    });
  };
  return Object.freeze(parser);
}; //createParser

//======================================================================
const elementtree = require("elementtree");
const constructor = (musicxml) =>
  createParser(elementtree.parse(musicxml.toString()));

module.exports = constructor;
