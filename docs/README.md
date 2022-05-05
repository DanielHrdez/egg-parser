[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7777151&assignment_repo_type=AssignmentRepo)

EGG Parser with Object Oriented Programming
==============

**Autor:** *[Daniel Hernández de León - alu0101331720](https://github.com/alu0101331720)*

***Introduction***

Para realizar la mejora de incluir objetos en el parser se necesita modificar la gramatica del parser.
También los propios tokens que utilizaremos para la gramatica y el Abstract Syntax Tree.

# Gramatica

## Program y Expressions

```js
program -> expression %EOF

expression -> 
      %STRING optProperties
    | %NUMBER optProperties
    | %REGEXP optProperties
    | %WORD applies
    | bracketExp optProperties
    | curlyExp optProperties
    | "(" commaExp ")"
    | %EOF
```

Ahora expression ahora puede generar brackets, curlies, ejecutar funciones y los literales ahora tienen propiedades.

## Applies y Properties

### General

```js
applies ->
      calls
    | properties
    | null

calls -> parenExp applies

properties ->
      bracketExp applies
    | selector applies
```

Los applies ahora pueden ser llamadas, propiedades o null.
Las properties pueden ser bracket expresiones (a[1]) o selectores (a.1).

### Extended

```js
parenExp   -> "(" commaExp ")"
bracketExp -> "[" commaExp "]"
curlyExp   -> "{" commaExp "}"

selector   ->  
      "." %WORD
    | "." %NUMBER

commaExp -> 
      null
    | expression "," commaExp
    | expression

optProperties ->
      null
    | properties
```

Los parentesis, corchetes y llaves son expresiones comma, que son expresiones seguidas de coma y otra expresion n repeticiones o ninguna.
Un selector puede ser un numero o una palabra.
Las optProperties son las propiedades que pueden ser aplicadas a una expresion.

# Tokens

```js
const SPACE = /(?<SPACE>\s+|#.*|\/[*](?:.|\n)*?[*]\/)/; SPACE.skip = true;
const NUMBER = /(?<NUMBER>[-+]?\d+(\.\d+)?(?:[eE][-+]?\d+)?)/; NUMBER.value =  x => Number(x);
const STRING = /(?<STRING>"(?:[^"\\]|\\.)*")/;
const REGEXP = /(?<REGEXP>\/.+\/)/;
const LP = /(?<LP>\()/;
const RP = /(?<RP>\))/;
const LB = /(?<LB>\[)/;
const RB = /(?<RB>\])/;
const LC = /(?<LC>\{)/;
const RC = /(?<RC>\})/;
const DOT = /(?<DOT>\.)/;
const COLON = /(?<COLON>:)/;
const WORD  = /(?<WORD>[^\s\(\),"\[\]\.:\{\}]+)/;
const COMMA = /(?<COMMA>,)/;
```

Se añaden los tokens para los corchetes, llaves, colon, punto, coma y se modifica el token word.

# Abstract Syntax Tree

## Manejo de Properties y Applies

```js
function buildPropertyOrApply([parenExp, applies], kind) {
  const result = {
    type: kind,
    operator: null,
    args: parenExp,
  };
  return buildNode(result, applies);
}
```

Para poder lidiar con tokens que son properies o applies se crea una funcion que recibe una lista de tokens y el tipo y se devuelve igual sea apply o property.

```js
function selector2Bracket([_, word]) {
  const name = word.value;
  return [{
    type: 'value',
    value: name,
    length: name.length,
    raw: `"${name}"`,
  }];
}
```

Los selectores se tranforman en bracket expressions.

```js
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
```

Los colons se transforman en comas.

Ej:

```js
{a: 1, b: 2} -> {"a", 1, "b", 2}
```

## Arrays y Objetos

### Arrays

```js
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
```

Se crea un nodo apply con un word array transformando.

Ej:

```js
[1, 2, 3] -> array(1, 2, 3)
```

### Objetos

```js
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
```

Igual que Array pero con object.
