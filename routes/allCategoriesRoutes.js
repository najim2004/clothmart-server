const express = require("express");
const { getCategories } = require("../controllers/allCategoriesController");
const router = express.Router();
router.get("/", getCategories);

module.exports = router;
