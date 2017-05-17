exports.control_get = function( req, res ){
  setModel( req, res );
}

exports.control = function( req, res ){
  let file = new fileHandler();

  file.uploadFile( req, "upload" );

  return {};
}

exports.control_download = function( req, res ){
  let file = new fileHandler();

  let model = file.downloadFile( req, res );

  return model;
}

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
    throw err;
  }

}





// exports.control_get = function( req, res, callback ){
//   setModel( req, res, callback );
// }
//
// exports.control = function( req, res, callback ){
//   let file = new fileHandler();
//
//   file.uploadFile( req, "upload" );
//
//   callback( null, {} );
// }
//
// exports.control_download = function( req, res, callback ){
//   let file = new fileHandler();
//
//   let model = file.downloadFile( req, res );
//
//   callback( null, model );
// }
//
// function setModel( req, res, callback ){
//   var model = {};
//
//   try{
//     model.method = req.method;
//     model.path = req._parsedUrl.pathname;;
//     model.postMessage = "";
//     model.queryString = JSON.stringify( req.query, null, 4 );
//     model.params = JSON.stringify( req.params, null, 4 );
//     model.controllerName = require( "path" ).basename( __filename );
//     model.controlFunction = "control";
//     model.dbRes = "-";
//     model.ajaxResult = "-";
//
//     callback( null, model );
//   } catch( err ){
//     callback( err, model );
//   }
//
// }
