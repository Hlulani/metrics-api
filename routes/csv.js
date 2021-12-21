var express = require("express");
const FileController = require("../controllers/FileController");

var router = express.Router();

router.get("/", FileController.getData);
router.get("/ds", FileController.getDataSources);
router.get("/camp", FileController.getCampaigns);
router.get("/ds/:datasource", FileController.getDataForDataSource);
router.get("/camp/:campaign", FileController.getDataForCampaign);
router.get("/:datasource/:campaign", FileController.getDataForDataSourceAndCampaign);


module.exports = router;