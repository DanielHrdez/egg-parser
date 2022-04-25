const { tokens } = require('./tokens.js');
const { nearleyLexer } = require("@ull-esit-pl-2122/lexer-generator-solution");

function colonTransformer(tokens) {  
}


// Substitute DOT{.} NUMBER{4.3} by DOT NUMBER{4} DOT{.} NUMBER{3}
function NumberToDotsTransformer(tokens) {
}

let lexer = nearleyLexer(tokens, { transform: [colonTransformer, NumberToDotsTransformer] });

//debugger;

module.exports = lexer;
