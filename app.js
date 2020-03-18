/**
*returns a function reference that function is called with express()
*/
const express=require('express');
const mgchRouter = require('./route');

/**initialization of express
*/
const app =express();

/**
*middlewares to handle the data
*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/mgch',mgchRouter);
/**
*setting the environment varible 
*/
const port = process.env.PORT || 3000;
/**
*starting the server
*listening on the port 3000
*/ 
var server=app.listen(port,()=>{
	console.log("server is up and running");
});
