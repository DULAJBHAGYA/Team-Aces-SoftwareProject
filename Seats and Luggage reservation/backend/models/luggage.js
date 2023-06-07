const mongoose = require("mongoose");

const luggageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: [true, "Sender Name required!"],
    },
    senderNIC: {
      type: String,
      required: [true, "Sender NIC required!"],
    },
    senderMobile: {
      type: String,
      required: [true, "Sender Mobile required!"],
    },
    receiverName: {
      type: String,
      required: [true, "Receiver Name required!"],
    },
    receiverNIC: {
      type: String,
      required: [true, "Receiver NIC required!"],
    },
    receiverMobile: {
      type: String,
      required: [true, "Receiver Mobile required!"],
    },
    weight: {
      type: Number,
      required: [true, "weight required!"],
    },
    luggageType: {
      type: String,
      required: [true, "Luggage Type required!"],
    },
  },
  {
    timestamps: true,
  }
);

const luggage = mongoose.model("luggage", luggageSchema);

module.exports = luggage;
