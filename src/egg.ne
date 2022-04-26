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
        buildWordApplies,
        buildKind,
        selector2Bracket,
        buildArray,
        buildObject,
} = require('./build-ast.js');

%}

@lexer lexer
program -> expression %EOF  {id}
expression -> 
      %STRING  optProperties  {buildStringValue}
    | %NUMBER  optProperties  {buildNumberValue}
    | %WORD applies           {buildWordApplies}
    | bracketExp              {buildArray}
    | curlyExp                {buildObject}


applies -> calls     
    | properties     
    | null           
calls ->  parenExp applies           
properties ->  bracketExp  applies   
    | selector applies                           

parenExp   -> "("  commaExp ")"  
bracketExp -> "["  commaExp "]"  {% ([lb, commaExp, rb]) => checkNonEmpty(lb, commaExp) %}
curlyExp   -> "{"  commaExp "}"  

selector   ->  
     "." %WORD           
   | "." %NUMBER         
commaExp -> null                 
   | expression ("," expression  

optProperties -> null 
   | properties       