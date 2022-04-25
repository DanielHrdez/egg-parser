const SPACE = /(?<SPACE>\s+|#.*|\/[*](?:.|\n)*?[*]\/)/; SPACE.skip = true;
// dot ambiguity solved is a floating  point only if followed by a digit
const NUMBER = /(?<NUMBER> XXXXX fill it XXXXX)?)/; NUMBER.value =  x => Number(x); // \d+ to resolve ambiguity
const STRING =  /(?<STRING>"(?:[^"\\]|\\.)*")/;
const LP = /(?<LP>\()/;
const RP = /(?<RP>\))/;
const LB = /(?<LB>\[)/;
const RB = /(?<RB>\])/;
const DOT = /(?<DOT>\.)/;
const COLON = /(?<COLON>:)/;

const WORD  = /(?<WORD>[^ XXXXX fill it XXXX]+)/;

const COMMA = /(?<COMMA>,)/;

/** Tokens object: definitions */
const tokens = [
  SPACE,
  NUMBER,
  STRING,
  LP,
  RP,
  LB,
  RB,
  DOT,
  COLON,
  COMMA,
  WORD,
];

module.exports = {SPACE, tokens};