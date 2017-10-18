exports.control = function( req, res ){
  return new Promise( function(resolve, reject){
	  resolve( { loginStatus: "PREPARED" } );
  } );
}

exports.control_redirect = function( req, res ){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	
  return new Promise( function(resolve, reject){
    logger.debug( "code", req.query.code );
    logger.debug( "postId", req.query.post_id );
    
    var authCode = req.query.code;
    var postId = req.query.post_id;
    var errorMsg = req.query.error;
    
    if( !errorMsg && !postId ){
    	var request = require( "request" );
        
        request( "https://graph.facebook.com/v2.10/oauth/access_token?client_id=755383531310577&redirect_uri=http://localhost:3000/authRedirect&client_secret=3061f142ac7873dfd34a2359fa670aa9&code=" + authCode, function(error, response, body){
          logger.debug( "access_token", JSON.parse(body) );
          
          var accessToken = ( JSON.parse(body) ).access_token;
       
          logger.debug( accessToken );
          
          request( "https://graph.facebook.com/v2.10/oauth/access_token?client_id=755383531310577&client_secret=3061f142ac7873dfd34a2359fa670aa9&grant_type=client_credentials", function(error_, response_, body_){
        	logger.debug( "app_access_token", JSON.parse(body_) );  
        	
        	var appAccessToken = ( JSON.parse(body_) ).access_token;
        	
        	logger.debug( appAccessToken );
        	
    	    request( "https://graph.facebook.com/v2.10/debug_token?input_token=" + accessToken + "&access_token=" + appAccessToken, function(_error, _response, _body){
    	  	  logger.debug( JSON.parse(_body) );
    	  	  
    	  	  var loginInfo = JSON.parse(_body);
    	  	  
    	  	  var connHandler = new connectionHandler( req, res );
    	  	  
    		  	connHandler.setSession( "app_id", loginInfo.data.app_id, function( results, error ){
    		  		if( err ) reject( err );
    		  	} );
    		  	
    		  	connHandler.setSession( "user_id", loginInfo.data.user_id, function( results, error ){
    		  		if( err ) reject( err );
    		  	} );
    		  	
    		  	request( "https://graph.facebook.com/v2.10/" + loginInfo.data.user_id + "/permissions?access_token=" + appAccessToken, function(error01, response01, body01){
    		  		logger.debug( JSON.parse(body01) );
    		  	});
    	  	  resolve( { loginStatus: "SUCCESS" } );
    	    } )
          } );
        } );
    } else {
    	if( postId ){
    		resolve( {loginStatus: postId} );
    	} else{
    		resolve( { loginStatus : "ERROR" } );
    	}
    }
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
