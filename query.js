//exporting the queries of elastic search.
module.exports = {
  /** 
  *Elastic search query of the index mgch_logs_* 
  *This function will retrieve data that have the logType either command ,wifi or etc...
  *@param {string} logType - The parameter of the logs of the index mgch_logs_*
  */
    query1 : function(logType){
      return {
        "query":{
        "bool":{
          "must": [
            {"match":{
              "logType":logType}}
          ]
        }
      }
    }
  },
  /**
  *Elastic search query of the index calculated_paramerters_* .
  *This will retrieve data that have the data when the parameter aplha does not match to null.
  *@param {string} alpha -The parameter of the logs of the index calculated_parameters_*
  */
  query2 : function(alpha){
    return {
      "query": {
        "bool": {
          "must_not": {
            "match": {
              "alpha":alpha
            }
          }
        }
      }
    }
  },
  /**
  *Elastic search query of the index calculated_paramerters_* .
  *This will retrieve data that have the data when the paramter beta have the vale greater than the specified value.
  *@param {number} gte - The parameter beta value is passed
  */

  query3 : function(gte){
    return {
        "query": {
            "range" : {
                "beta" : {
                    "gte" : gte
                }
            }
        }
    }
  },
  /**
  *Elastic search query of the index mgch_logs_*.
  *This will retrieve the data when the data is required of the specified date range .
  *@param {array} ts -The parameter with the time stamp 
  */
  query4 : function(ts){

    return {
        "aggs": {
            "range": {
                "date_range": {
                    "field": "ts",
                    "ranges": [
                        { "to": ts[0] }, 
                        { "from": ts[1]} 
                    ]
                }
            }
        }
    }
  },
  /**
  *Elastic search query of the index of mgch_logs_* .
  *This will give the logs details when logType ,deviceId,status is specified.
  *@param {array} status -The parameter with the status of the index.
  */

  query5 : function(parameters){

    

    let sta = parameters.status[0]+" or "+parameters.status[1];

    return {
      "query": { 
        "bool": { 
          "must": [
            { "match": { "logType": parameters.logType[0]}},
            { "match": { "deviceId": parameters.deviceId[0]}},
            {"match":{"status": sta}}
          ]
        }
      }
    }
  },
  /**
  *Elastic search query of the index of the mgch_logs_*.
  *This will give the data when the logs source is specified by the user.
  *@param {object} source -The parameter with the source of the logs.
  */

  query6 : function(parameters){
    return {
    "query":{
      "bool":{
        "must": 
          {
        "match":{
          "source": parameters.source
          }
        }
      }
    }
    }
  },
  query7 :function(deviceId){
    return{
      "query":{
        "bool":{
          "must":
          {
            "match":{
              "deviceId":deviceId
            }
          }
        }
      }
    }
  },
  query8 :function(controllerId){
    return{
      "query":{
        "bool":{
          "must": [
            {"match":{
              "controllerId":controllerId}}
          ]
        }
      }
  }
},
  query9 : function(Sjr){
    return {
      "query": {
        "bool": {
          "must": {
            "match": {
              "Sjr":Sjr
            }
          }
        }
      }
    }
},
  query10 : function(Sjt){
    return {
      "query": {
        "bool": {
          "must_not": {
            "match": {
              "Sjt":Sjt
            }
          }
        }
      }
    }
},
  query11 : function(Sth){
    return {
      "query": {
        "bool": {
          "must": {
            "match": {
              "Sth":Sth
            }
          }
        }
      }
    }
},
  query12 : function(alpha){
    return {
      "query": {
        "bool": {
          "must": {
            "match": {
              "alpha":alpha
            }
          }
        }
      }
    }
}

} ;