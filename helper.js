/**
*require client.js file to include the elasticsearch client 
*/
const esClient = require('./client');
const query = require('./query');
/*
*asynchronour function returning the promise and executes without having dependency on other.
*/
async function run(parameters,type) 
{
	/*
	*declaring the variable
	*/
	let body;
    /*
    *conditions to check the index from which the given query belongs .
	*/
	if(type === 'mgch_calculated_parameters_*'){
		/*
		*conditions on parameters of the indexes of elastic search
		*/
		if(parameters.beta !== undefined){
			body = query.query3(parameters.beta);
		}
		else if(parameters.alpha !==undefined){
			body = query.query2(parameters.alpha);
		}
		else if(parameters.Sjr !==undefined){
			body = query.query9(parameters.Sjr);
		}
		else if(parameters.Sjt !==undefined){
			body = query.query10(parameters.Sjt);
		}
		else if(parameters.Sth !==undefined){
			body = query.query11(parameters.Sth);
		}

		// else if(parameters.deviceId !==undefined)
		// {
		// 	body=query.query7(parameters.deviceId);
		// }
		
	}
	else{
		/*
		*condition of time stamp parameter in logs 
		*/
		if(parameters.ts !== undefined){
			body = query.query4(parameters.ts);
		}
		/*
		*condition of the deviceId of the index mgch_logs_*
		*/
		else if(parameters.deviceId !== undefined){
			body = query.query5(parameters);
		}
		/*
		*condition of the source of the logs 
		*/
		else if(parameters.source !== undefined){
			body = query.query6(parameters);	
		}
		else if(parameters.logType !==undefined)
		{
			body=query.query1(parameters.logType);
		}
		else if(parameters.controllerId !==undefined)
		{
			body=query.query8(parameters.controllerId);
		}
	}
     
	try {
		const resp=await esClient.search({
	    index: type,
	    body : body
  	});
		return resp;
	}
	catch(e)
	{
		return e;
	}
   
}
module.exports=run;