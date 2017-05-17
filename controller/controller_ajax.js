exports.control = function( req, res ){
  var model = {};

  try{
    model.ajaxResult = "Called with [" + req.query[ "text" ] + "]";

    return model;
  } catch( err ){
    throw err;
  }
}



// exports.control = function( req, res, callback ){
//   var model = {};
//
//   try{
//     model.ajaxResult = "Called with [" + req.query[ "text" ] + "]";
//     callback( null, model );
//   } catch( err ){
//     callback( err, model );
//   }
// }
