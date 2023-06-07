const Luggage = require("../models/luggage");

// get all luggage
const getAllLuggage = async (req, res) => {
  const luggage = await Luggage.find();
  res.status(200).json(luggage);
};

//create luggage
const createLuggae = async (req, res) => {
  const {
    senderName,
    senderNIC,
    senderMobile,
    receiverName,
    receiverNIC,
    receiverMobile,
    weight,
    luggageType,
  } = req.body;

  try {
    const luggage = await Luggage.create({
      senderName,
      senderNIC,
      senderMobile,
      receiverName,
      receiverNIC,
      receiverMobile,
      weight,
      luggageType,
    });

    res.status(201).json(luggage);
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllLuggage, createLuggae };
