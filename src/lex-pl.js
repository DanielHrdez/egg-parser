const { tokens } = require('./tokens.js');
const { nearleyLexer } = require('@ull-esit-pl-2122/lexer-generator-daniel-hernandez-de_leon-alu0101331720');

function colonTransformer(tokens) {
  tokens.forEach((token, index) => {
    if (token.type === 'COLON') {
      prevToken = tokens[index - 1];
      prevToken.type = 'STRING';
      prevToken.value = `"${prevToken.value}"`;
      token.type = 'COMMA';
      token.value = ',';
    }
  });
  return tokens;
}

let lexer = nearleyLexer(tokens, { transform: [colonTransformer] });

//debugger;

module.exports = lexer;
