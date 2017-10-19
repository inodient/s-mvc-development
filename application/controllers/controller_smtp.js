/*
* @controller("sendmail")
* @controller-method("get")
* @controller-requestMapping("/sendmail")
* @controller-viewPath("")
* @controller-view("smtp.ejs")
*/

exports.control = function( req, res ){
	return new Promise( function(resolve, reject){
		var fromAddr, toAddr, msg;
		
		fromAddr = req.query.fromAddr;
		toAddr = req.query.toAddr;
		msg = req.query.msg;
		
		
		
		var nodemailer = require( "nodemailer" );
		
		nodemailer.createTestAccount( (err, account) => {
			let transporter = nodemailer.createTransport({
				host: "krrelay.corp.doosan.com",
				port: 25,
				secure: false
			} );
			
			let mailOption = {
					from: fromAddr,
					to: toAddr,
					subject: "TEST Mail",
					text: msg
			}
			
			transporter.sendMail( mailOption, (error, info) =>{
				if( error ) reject( error );
				
				logger.debug( "Message sent: %s", info.messageId );
				logger.debug( "Preview URL: %s", nodemailer.getTestMessageUrl(info) );
			} );
		} );
		
		
		resolve( {results: "TEST"} );
	} );
}