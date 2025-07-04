const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionController');

router.get('/init', controller.initDB);
router.get('/transactions', controller.listTransactions);
router.get('/statistics', controller.statistics);
router.get('/bar-chart', controller.barChart);
router.get('/pie-chart', controller.pieChart);
router.get('/combined', controller.combinedData);

module.exports = router;