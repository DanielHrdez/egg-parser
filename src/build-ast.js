/**
 * The ASTs of the Egg Lang 
 * @external Grammar
 * @see {@link https://ull-esit-pl-2122.github.io/temas/syntax-analysis/ast.html#gramatica-informal-de-los-arboles-del-parser-de-egg}
 */

function buildNumberValue([numberNode, properties]) {
  const number = {
    type: 'value',
    value: numberNode.value,
    length: (numberNode.value + '').length,
  };
  if (!properties) return number;
  if (!properties.operator) {
    properties.operator = number;
    return properties;
  }
  let operator = properties.operator;
  while (operator.operator) {
    operator = operator.operator;
  }
  operator.operator = number;
  return properties;
}

function buildStringValue([stringNode, properties]) {
  const stringValue = stringNode.value;
  const stringLength = stringValue.length;
  const stringLiteral = stringValue.slice(1, stringLength - 1);
  const string = {
    type: 'value',
    value: stringLiteral,
    length: stringLength,
    raw: stringValue,
  };
  if (!properties) return string;
  if (!properties.operator) {
    properties.operator = string;
    return properties;
  }
  let operator = properties.operator;
  while (operator.operator) {
    operator = operator.operator;
  }
  operator.operator = string;
  return properties;
}

function buildWordApplies([word, applies]) {
  const wordNode = {
    type: 'word',
    length: word.value.length,
    name: word.value,
  };
  if (!applies) return wordNode;
  if (!applies.operator) {
    applies.operator = wordNode;
    return applies;
  }
  let operator = applies.operator;
  while (operator.operator) {
    operator = operator.operator;
  }
  operator.operator = wordNode;
  return applies;
}

function buildPropertyOrApply([parenExp, applies], kind) {
  const result = {
    type: kind,
    operator: null,
    args: parenExp,
  };
  if (!applies) return result;
  if (!applies.operator) {
    applies.operator = result;
    return applies;
  }
  let operator = applies.operator;
  while (operator.operator) {
    operator = operator.operator;
  }
  operator.operator = result;
  return applies;
}

function selector2Bracket([_, word]) {
  const name = word.value;
  return [{
    type: 'value',
    value: name,
    length: name.length,
    raw: `"${name}"`,
  }];
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
  if (!properties) return arrayNode;
  if (!properties.operator) {
    applies.operator = arrayNode;
    return applies;
  }
  let operator = properties.operator;
  while (operator.operator) {
    operator = operator.operator;
  }
  operator.operator = arrayNode;
  return properties;
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
  if (!properties) return objectNode;
  if (!properties.operator) {
    properties.operator = objectNode;
    return properties;
  }
  let operator = properties.operator;
  while (operator.operator) {
    operator = operator.operator;
  }
  operator.operator = objectNode;
  return properties;
}

function checkNonEmpty(commaExp) {
  if (commaExp.length === 0) throw new Error('Empty expression');
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
