/**
 * The ASTs of the Egg Lang 
 * @external Grammar
 * @see {@link https://ull-esit-pl-2122.github.io/temas/syntax-analysis/ast.html#gramatica-informal-de-los-arboles-del-parser-de-egg}
 */

function buildNode(node, apply) {
  if (!apply) return node;
  if (!apply.operator) {
    apply.operator = node;
    return apply;
  }
  let operator = apply.operator;
  while (operator.operator) {
    operator = operator.operator;
  }
  operator.operator = node;
  return apply;
}

function buildNumberValue([numberNode, properties]) {
  const number = {
    type: 'value',
    value: numberNode.value,
    length: (numberNode.value + '').length,
  };
  return buildNode(number, properties);
}

function buildStringValue([stringNode, properties]) {
  const stringValue = stringNode.value;
  const stringLength = stringValue.length;
  const stringLiteral = stringValue.slice(1, stringLength - 1);
  const string = {
    type: 'value',
    value: stringLiteral,
    length: stringNode.length,
    raw: stringValue,
  };
  return buildNode(string, properties);
}

function buildWordApplies([word, applies]) {
  const wordNode = {
    type: 'word',
    length: word.value.length,
    name: word.value,
  };
  return buildNode(wordNode, applies);
}

function buildPropertyOrApply([parenExp, applies], kind) {
  const result = {
    type: kind,
    operator: null,
    args: parenExp,
  };
  return buildNode(result, applies);
}

function selector2Bracket([_, word]) {
  if (word.type === 'WORD') {
    word.value = `"${word.value}"`;
    return [buildStringValue([word])];
  }
  if (word.type === 'NUMBER') return [buildNumberValue([word])];
}

const buildKind = {
  property: (node) => buildPropertyOrApply(node, 'property'),
  apply: (node) => buildPropertyOrApply(node, 'apply'),
};

function buildArray([commaExp, properties]) {
  const arrayNode = {
    type: 'apply',
    operator: {
      type: 'word',
      length: 'array'.length,
      name: 'array',
    },
    args: commaExp,
  };
  return buildNode(arrayNode, properties);
}

function buildDo([lp, commaExp, rp]) {
  return {
    type: 'apply',
    operator: {
      type: 'word',
      length: 'do'.length,
      name: 'do',
    },
    args: commaExp,
  };
}

function buildObject([commaExp, properties]) {
  const objectNode = {
    type: 'apply',
    operator: {
      type: 'word',
      length: 'object'.length,
      name: 'object',
    },
    args: commaExp,
  };
  return buildNode(objectNode, properties);
}

function checkNonEmpty(commaExp) {
  if (commaExp.length === 0) throw new Error('Unexpected Empty array');
  return commaExp;
}

function dealWithError() {
  throw new Error('Unexpected EOF token');
}

module.exports = { 
  buildStringValue, 
  buildNumberValue, 
  buildWordApplies, 
  buildKind,
  selector2Bracket,
  buildArray,
  buildObject,
  buildDo,
  checkNonEmpty,
  dealWithError,
};
