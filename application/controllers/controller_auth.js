exports.control = function( req, res ){
  return new Promise( function(resolve, reject){
    resolve( {} );
  } );
}

exports.control_redirect = function( req, res ){
  return new Promise( function(resolve, reject){
    logger.debug( req.query.code );

    var authCode = req.query.code;

    var request = require( "request" );

    request( "https://graph.facebook.com/v2.10/oauth/access_token?client_id=755383531310577&redirect_uri=http://localhost:3000/authRedirect&client_secret=3061f142ac7873dfd34a2359fa670aa9&code=" + authCode, function(error, response, body){
      logger.debug( body );
    } );
  } );
}





function setModel( req, res ){
  return new Promise( function(resolve, reject){

    var queries = require( __mysqlQueries );
    var model = {};

    try{
      model.method = req.method;
      model.path = req._parsedUrl.pathname;;
      model.queryString = JSON.stringify( req.query, null, 4 );
      model.params = JSON.stringify( req.params, null, 4 );

      model.queries = queries;
      model.message = "Default summer-mvc Test Request"

      resolve( model );
    } catch( err ){
      console.log( "controller_basic.js error" );
      reject( err );
    }
  } );
}
