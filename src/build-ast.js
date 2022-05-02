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

function selector2Bracket([_, word]){

}

const buildKind = {
  property: (node) => buildPropertyOrApply(node, 'property'),
  apply: (node) => buildPropertyOrApply(node, 'apply'),
};

function buildArray([commaExp, properties]) {

}

function buildDo([_, commaExp, _]) {

}


function buildObject([commaExp, properties]) {

}

function checkNonEmpty(lb, commaExp) {

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
