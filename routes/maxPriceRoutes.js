const express = require("express");
const { getMaxPrice } = require("../controllers/maxPriceController");
const router = express.Router();
router.get("/", getMaxPrice);

module.exports = router;
