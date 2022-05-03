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

function numberToDotsTransformer(tokens) {
  tokens.forEach((token, index) => {
    const next = tokens[index + 1];
    if (
      token.type === 'DOT' &&
      next.type === 'NUMBER' &&
      (next.value + '').includes('.')
    ) {
      const [integer, decimal] = String(next.value).split('.');
      next.value = +integer;
      next.length = integer.length;
      tokens.splice(index + 2, 0, {
        type: 'DOT',
        value: '.',
        length: 1,
      });
      tokens.splice(index + 3, 0, {
        type: 'NUMBER',
        value: +decimal,
        length: decimal.length,
      });
    }
  });
  return tokens;
}

let lexer = nearleyLexer(tokens, { transform: [colonTransformer, numberToDotsTransformer] });

//debugger;

module.exports = lexer;
