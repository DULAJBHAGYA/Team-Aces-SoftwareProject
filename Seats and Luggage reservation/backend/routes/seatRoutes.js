const express = require("express");

const router = express.Router();

const {
  getAllSeats,
  createSeat,
  selectSeats,
} = require("../controllers/seatController");

router.route("/").get(getAllSeats);

router.route("/").post(createSeat);

router.route("/select").patch(selectSeats);

module.exports = router;
