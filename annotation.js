var annotations = require( "annotations" );

var result = annotations.getSync( require("path").join(process.cwd(), "controller", "controller_annotation.js") );

console.log( result );
