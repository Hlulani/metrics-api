const apiResponse = require("../helpers/apiResponse");
const fs = require("fs")
var parse = require("csv-parse")

// Read Data 
global.csvData=[];

function readCSVData () {
  fs.createReadStream(process.env.CSV_FILE_PATH)
      .pipe(parse.parse({delimiter: ','}))
      .on('data', function(csvrow) {
          // console.log(csvrow);
          //do something with csvrow
          var obj = {
            date: new Date(csvrow[0]),
            dataSource : csvrow[1],
            campaign: csvrow[2],
            clicks: parseInt(csvrow[3]),
            impressions: parseInt(csvrow[4])
          }
          global.csvData.push(obj);        
      })
      .on('end',function() {
        //do something with csvData
        // console.log(csvData);
      });
}
const getData = function (req, res) {
  try {
    apiResponse.successResponseWithData(res, 'All data', global.csvData);
  } catch (err) {
    //throw error in json response with status 500. 
    return apiResponse.ErrorResponse(res, err);
  }
}

const getDataForDataSource = function (req, res) {
  var datasource = req.params.datasource;

  try {
    var objs = global.csvData.filter(obj => obj.dataSource == datasource);
    apiResponse.successResponseWithData(res, 'Data for dataSource', objs);
  } catch (err) {
    //throw error in json response with status 500. 
    return apiResponse.ErrorResponse(res, err);
  }
}

const getDataForCampaign = function (req, res) {
  var campaign = req.params.campaign;

  try {
    var objs = global.csvData.filter(obj => obj.campaign == campaign);
    apiResponse.successResponseWithData(res, 'Data for campaign', objs);
  } catch (err) {
    //throw error in json response with status 500. 
    return apiResponse.ErrorResponse(res, err);
  }
}

const getDataForDataSourceAndCampaign = function (req, res) {
  var datasource = req.params.datasource;
  var campaign = req.params.campaign;

  try {
    var objs = global.csvData.filter(obj => obj.dataSource == datasource && obj.campaign == campaign);
    apiResponse.successResponseWithData(res, 'Data for dataSource and campaign', objs);
  } catch (err) {
    //throw error in json response with status 500. 
    return apiResponse.ErrorResponse(res, err);
  }
}

const getDataSources = function (req, res) {
  try {
    var objs = global.csvData.map(obj => obj.dataSource);
    apiResponse.successResponseWithData(res, 'All Data Sources', [...new Set(objs)]);
  } catch (err) {
    //throw error in json response with status 500. 
    return apiResponse.ErrorResponse(res, err);
  }
}

const getCampaigns = function (req, res) {
  try {
    var objs = global.csvData.map(obj => obj.campaign);
    apiResponse.successResponseWithData(res, 'All Campaigns', [...new Set(objs)]);
  } catch (err) {
    //throw error in json response with status 500. 
    return apiResponse.ErrorResponse(res, err);
  }
}


module.exports = {
  csvData,
  readCSVData,
  getData,
  getDataForDataSource,
  getDataForCampaign,
  getDataForDataSourceAndCampaign,
  getDataSources,
  getCampaigns,
}