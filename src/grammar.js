// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

/**
 * The Grammar of the Egg Lang extended with OOP in nearley.js 
 * @external Grammar
 * @see {@link https://ull-esit-gradoii-pl.github.io/practicas/egg-oop-parser.html}
 */

const lexer = require('./lex-pl.js');
const { 
  buildStringValue,
  buildNumberValue,
  buildRegexpValue,
  buildWordApplies,
  buildKind,
  selector2Bracket,
  buildArray,
  buildObject,
  checkNonEmpty,
  buildDo,
  dealWithError,
} = require('./build-ast.js');

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "program", "symbols": ["expression", (lexer.has("EOF") ? {type: "EOF"} : EOF)], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING), "optProperties"], "postprocess": buildStringValue},
    {"name": "expression", "symbols": [(lexer.has("NUMBER") ? {type: "NUMBER"} : NUMBER), "optProperties"], "postprocess": buildNumberValue},
    {"name": "expression", "symbols": [(lexer.has("REGEXP") ? {type: "REGEXP"} : REGEXP), "optProperties"], "postprocess": buildRegexpValue},
    {"name": "expression", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD), "applies"], "postprocess": buildWordApplies},
    {"name": "expression", "symbols": ["bracketExp", "optProperties"], "postprocess": buildArray},
    {"name": "expression", "symbols": ["curlyExp", "optProperties"], "postprocess": buildObject},
    {"name": "expression", "symbols": [{"literal":"("}, "commaExp", {"literal":")"}], "postprocess": buildDo},
    {"name": "expression", "symbols": [(lexer.has("EOF") ? {type: "EOF"} : EOF)], "postprocess": dealWithError},
    {"name": "applies", "symbols": ["calls"], "postprocess": id},
    {"name": "applies", "symbols": ["properties"], "postprocess": id},
    {"name": "applies", "symbols": [], "postprocess": () => null},
    {"name": "calls", "symbols": ["parenExp", "applies"], "postprocess": buildKind['apply']},
    {"name": "properties", "symbols": ["bracketExp", "applies"], "postprocess": buildKind['property']},
    {"name": "properties", "symbols": ["selector", "applies"], "postprocess": buildKind['property']},
    {"name": "parenExp", "symbols": [{"literal":"("}, "commaExp", {"literal":")"}], "postprocess": ([lp, commaExp, rp]) => commaExp},
    {"name": "bracketExp", "symbols": [{"literal":"["}, "commaExp", {"literal":"]"}], "postprocess": ([lb, commaExp, rb]) => checkNonEmpty(commaExp)},
    {"name": "curlyExp", "symbols": [{"literal":"{"}, "commaExp", {"literal":"}"}], "postprocess": ([lc, commaExp, rc]) => commaExp},
    {"name": "selector", "symbols": [{"literal":"."}, (lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": selector2Bracket},
    {"name": "selector", "symbols": [{"literal":"."}, (lexer.has("NUMBER") ? {type: "NUMBER"} : NUMBER)], "postprocess": selector2Bracket},
    {"name": "commaExp", "symbols": [], "postprocess": () => []},
    {"name": "commaExp", "symbols": ["expression", {"literal":","}, "commaExp"], "postprocess": ([exp, comma, commaExp]) => [exp, ...commaExp]},
    {"name": "commaExp", "symbols": ["expression"], "postprocess": ([e]) => [e]},
    {"name": "optProperties", "symbols": [], "postprocess": () => null},
    {"name": "optProperties", "symbols": ["properties"], "postprocess": id}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
