const SPACE = /(?<SPACE>\s+|#.*|\/[*](?:.|\n)*?[*]\/)/; SPACE.skip = true;
const NUMBER = /(?<NUMBER>[-+]?\d+(\.\d+)?(?:[eE][-+]?\d+)?)/; NUMBER.value =  x => Number(x);
const STRING = /(?<STRING>"(?:[^"\\]|\\.)*")/;
const REGEXP = /(?<REGEXP>\/.+\/)/;
const LP = /(?<LP>\()/;
const RP = /(?<RP>\))/;
const LB = /(?<LB>\[)/;
const RB = /(?<RB>\])/;
const LC = /(?<LC>\{)/;
const RC = /(?<RC>\})/;
const DOT = /(?<DOT>\.)/;
const COLON = /(?<COLON>:)/;
const WORD  = /(?<WORD>[^\s\(\),"\[\]\.:\{\}]+)/;
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
  LC,
  RC,
  DOT,
  COLON,
  COMMA,
  WORD,
  REGEXP,
];

module.exports = {SPACE, tokens};