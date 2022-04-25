/**
 * The ASTs of the Egg Lang 
 * @external Grammar
 * @see {@link https://ull-esit-pl-2122.github.io/temas/syntax-analysis/ast.html#gramatica-informal-de-los-arboles-del-parser-de-egg}
 */

function buildNumberValue([numbernode, properties]) {
}

function buildStringValue([stringnode, properties]) {

}

function fromListToAST(word, applies) {

}

function buildWordApplies([word, applies]) {

}

function buildPropertyOrApply([parenExp, applies], kind) { 
 }

function selector2Bracket([ _, word]){

}

const buildKind = {
};

function buildArray([commaExp]) {

}


function buildObject([commaExp]) {

}

 module.exports = { 
  buildStringValue, 
  buildNumberValue, 
  buildWordApplies, 
  buildKind,
  selector2Bracket,
  buildArray,
  buildObject,
};
