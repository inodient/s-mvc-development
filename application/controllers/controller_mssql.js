/*
* @controller("mssql")
* @controller-method("get")
* @controller-requestMapping("/mssql")
* @controller-viewPath("")
* @controller-view("mssql.ejs")
*/

const mssql = require( "mssql" );

exports.control = function( req, res ){
	return new Promise( function(resolve, reject){
		
		var connectionStr = "mssql://usrCERND:usrIMSI^0730CERND@DIOPRDB01/rddb";
		const config = {
				user: "usrCERND",
				password: "usrIMSI^0730CERND",
				server: "DIOPRDB01",
				database: "rddb",
				
				options: {
					encrypt: true
				}	
		}
		
		mssql.connect( config ).then( pool => {
			return pool.request()
			.input( "input_parameter","i0198101" )
			.query( "select * from zcct1010 where EMP_NO = @input_parameter" )
		} )
		.then( result => {
			logger.debug( result );
			resolve( {results: JSON.stringify(result, null, 4) } );
		} )
		.catch( err => {
			reject( err );
		} );
	} );
}