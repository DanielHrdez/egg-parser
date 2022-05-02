/**
 * The ASTs of the Egg Lang 
 * @external Grammar
 * @see {@link https://ull-esit-pl-2122.github.io/temas/syntax-analysis/ast.html#gramatica-informal-de-los-arboles-del-parser-de-egg}
 */

function buildNumberValue([numberNode, properties]) {
  const node = {
    type: 'value',
    value: numberNode.value,
    raw: numberNode.text,
  };
  if (!properties) return node;
  properties.operator = node;
  return properties;
}

function buildStringValue([stringNode, properties]) {
  const node =  {
    type: 'value',
    value: stringNode.value.replace('"', '').replace('"', ''),
    raw: stringNode.text.replace('"', '').replace('"', ''),
  };
  if (!properties) return node;
  properties.operator = node;
  return properties;
}

function buildWordApplies([word, applies]) {
  const wordNode = {
    type: 'word',
    line: word.line,
    col: word.col,
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
  if (!applies) return {
    type: kind,
    args: parenExp,
  };
  if (!applies.operator) {
    applies.operator = parenExp;
    return applies;
  }
  let operator = applies.operator;
  while (operator.operator) {
    operator = operator.operator;
  }
  operator.operator = parenExp;
  return applies;
}

function selector2Bracket([_, word]){
  return [word];
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
      name: 'array',
    },
    args: commaExp,
  };
  if (!properties) return arrayNode;
  if (!properties.operator) {
    properties.operator = arrayNode;
    return properties;
  }
  let operator = properties.operator;
  while (operator.operator) {
    operator = operator.operator;
  }
  operator.operator = arrayNode;
  return properties;
}

function buildDo([_, commaExp, _]) {
  return {
    type: 'apply',
    operator: {
      type: 'word',
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

function dealWithError(error) {
  throw new Error(error);
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
