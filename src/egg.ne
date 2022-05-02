@{%
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

%}

@lexer lexer

program -> expression %EOF  {% id %}

expression -> 
      %STRING optProperties     {% buildStringValue %}
    | %NUMBER optProperties     {% buildNumberValue %}
    | %REGEXP optProperties     {% buildRegexpValue %}
    | %WORD applies             {% buildWordApplies %}
    | bracketExp optProperties  {% buildArray %}
    | curlyExp optProperties    {% buildObject %}
    | "(" commaExp ")"          {% buildDo %}
    | %EOF                      {% dealWithError %}

applies ->
      calls         {% id %}
    | properties    {% id %}
    | null          {% () => null %}

calls -> parenExp applies   {% buildKind['apply'] %}

properties ->
      bracketExp applies    {% buildKind['property'] %}
    | selector applies      {% buildKind['property'] %}

parenExp   -> "(" commaExp ")"  {% ([lp, commaExp, rp]) => commaExp %}
bracketExp -> "[" commaExp "]"  {% ([lb, commaExp, rb]) => checkNonEmpty(lb, commaExp) %}
curlyExp   -> "{" commaExp "}"  {% ([lc, commaExp, rc]) => commaExp %}  

selector   ->  
      "." %WORD     {% selector2Bracket %}
    | "." %NUMBER   {% selector2Bracket %}

commaExp -> 
      null                       {% () => [] %}
    | expression "," commaExp    {% ([exp, comma, commaExp]) => [exp, ...commaExp] %}
    | expression                 {% ([e]) => [e] %}

optProperties ->
      null          {% () => null %}
    | properties    {% id %}