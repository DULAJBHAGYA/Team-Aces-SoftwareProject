const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    seatNo: {
      type: Number,
      required: [true, "Please Select a seat!"],
    },
    availability: {
      type: Boolean,
      default: true,
      required: [true, "Please Select a availability!"],
    },
  },
  {
    timestamps: true,
  }
);

const seat = mongoose.model("seat", seatSchema);

module.exports = seat;
