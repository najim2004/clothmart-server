const express = require("express");
const { getBrandsName } = require("../controllers/brandsNameController");
const router = express.Router();
router.get("/", getBrandsName);

module.exports = router;
