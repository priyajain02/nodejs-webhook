/** 
  *we are requiring Express and creating a new instance of Router on it. 
  *We are holding that in a variable called router.
  *This Router is the "container" for the middleware on this route. 
  */
const router = require('express').Router();
const run = require('./helper');
//used to request data from the source.
/**
 * Send a request.
 */
router.get('/',(req,res)=>{
	return res.status(200).send({
		message:'Get call succeded'
	});
});
/**
*To send the data to the server.
*/
router.post('/',(req,res) => {

	


	//let parameters = req.body.queryResult.parameters;
	let parameters =req.body;

	let type;

	if(parameters.alpha === undefined && parameters.beta === undefined ){
		// if(parameters.controllerId !== undefined ){
		type = "mgch_logs_*";
		// }
		// else
		// {
		// 	type="mgch_data_*"
		// }
	}
	else
	{
		type = "mgch_calculated_parameters_*";	
	}

	//callbacks are used here.

	run(parameters,type).then((data) => {
		const response = {};
		response.fulfillmentText = "Query was Sucessfull";
		response.fulfillmentMessage = [];
		const ans = {};
		ans.text = "Query was successfull";
		ans.payload = data;
		response.fulfillmentMessage[0] = ans;
		res.send(response);
		res.end();
	}).catch((err) => {
		const response = {};
		response.fulfillmentText = "Query was not Sucessfull";
		response.fulfillmentMessage = [];
		const ans = {};
		ans.text = "Error";
		ans.payload = {};
		response.fulfillmentMessage[0] = ans;
		res.send(response);
		res.end();
	});

});
//we export the Router.
module.exports = router;
