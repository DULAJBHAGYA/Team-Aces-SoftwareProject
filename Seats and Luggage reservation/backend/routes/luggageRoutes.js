const express = require("express");
const {
  createLuggae,
  getAllLuggage,
} = require("../controllers/luggageController");

const router = express.Router();

router.route("/").get(getAllLuggage);

router.route("/").post(createLuggae);

module.exports = router;
