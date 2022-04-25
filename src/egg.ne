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
program -> expression %EOF 
expression -> 
      %STRING  optProperties  
    | %NUMBER  optProperties  
    | %WORD applies           
    | bracketExp              
    | curlyExp                


applies -> calls     
    | properties     
    | null           
calls ->  parenExp applies           
properties ->  bracketExp  applies   
    | selector applies                           

parenExp   -> "("  commaExp ")"  
bracketExp -> "["  commaExp "]"  
curlyExp   -> "{"  commaExp "}"  

selector   ->  
     "." %WORD           
   | "." %NUMBER         
commaExp -> null                 
   | expression ("," expression  

optProperties -> null 
   | properties       