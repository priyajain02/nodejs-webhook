//Require, then initialize the client
const es = require('elasticsearch');
const esClient = new es.Client({
	//specifies the port number of the elastic search.
    host: 'localhost:9200',
    log: 'trace'
});
//exports the elastic search.
module.exports = esClient;


