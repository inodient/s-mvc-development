/**
*
* @Controller
* @requestMapping /
* @requestMapping /index
* @params id : inodient
* @params password : iloveyou
*/
exports.control = function( req, res ){
  return setModel( req, res );
}


// @controller
// @RequestMapping '/'
function setModel( req, res ){
  var model = {};

  try{
    model.method = req.method;
    model.path = req._parsedUrl.pathname;;
    model.postMessage = "";
    model.queryString = JSON.stringify( req.query, null, 4 );
    model.params = JSON.stringify( req.params, null, 4 );
    model.controllerName = require( "path" ).basename( __filename );
    model.controlFunction = "control";
    model.dbRes = "-";
    model.ajaxResult = "-";

    return model;
  } catch( err ){
    return model;
  }
}
