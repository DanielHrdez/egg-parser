'use strict';
const { SPACE } = require("./tokens.js");
const fs = require('fs');
const nearley = require("nearley");
const grammar = require("./grammar.js");
const lex = require('./lex-pl.js');

// Check parenthesis balance
// TODO: check array brackets balance
function parBalance(line) {
   /* XXXX use yours XXXX */
}

function parse(p) {
  //debugger;
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(p);
  
  const ast = parser.results[0];
  return ast;
}

 /**
 * A function that parses a egg file
 * @param {string} origin The name of the origin file
 * @throws Will throw if there are errors in the program or if the files
 *     can't be opened
 */
function parseFromFile(origin) {
  //debugger;

  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  const source = fs.readFileSync(origin, 'utf8');
  parser.feed(source);
  const ast = parser.results[0];

  return ast;
};

let getTokens = function(line) {
   /* XXXX use yours XXXX */
};

module.exports = {
  lex,
  parse,
  parseFromFile,
  parBalance,
  SPACE,
  getTokens
};
