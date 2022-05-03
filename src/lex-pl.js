const { tokens } = require('./tokens.js');
const { nearleyLexer } = require('@ull-esit-pl-2122/lexer-generator-daniel-hernandez-de_leon-alu0101331720');

function colonTransformer(tokens) {
  // WORD, COLON into STRING, COMMA
  // x: 4 -> "x", 4
  debugger;
  tokens.forEach((token, index) => {
    if (token.type === 'COLON') {
      const word = tokens[index - 1];
      tokens[index - 1] = {
        type: 'STRING',
        value: word.value,
        length: word.length,
      };
      tokens[index] = {
        type: 'COMMA',
        value: ',',
        length: 1,
      };
    }
  });
  return tokens;
}

let lexer = nearleyLexer(tokens, { transform: [colonTransformer] });

//debugger;

module.exports = lexer;
