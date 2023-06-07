const Seat = require("../models/seat");

// get all seats
const getAllSeats = async (req, res) => {
  const seats = await Seat.find();
  res.status(200).json(seats);
};

// create seat
const createSeat = async (req, res) => {
  const { seatNo, availability } = req.body;
  try {
    if (!seatNo) {
      res.status(400);
      throw new Error("Seat is required!");
    }

    const seat = await Seat.create({
      seatNo,
      availability,
    });

    res.status(201).json(seat);
  } catch (err) {
    throw err;
  }
};

// //select seat
// const selectSeats = async (req, res) => {
//   const seats = await Seat.findById(req.params.id);

//   if (!seats) {
//     res.status(404);
//     throw new Error("seats not found");
//   }

//   const updateSeats = await Seat.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   res.status(200).json(updateSeats);
// };

const selectSeats = async (req, res) => {
  const seatIds = req.body.seatIds;

  try {
    const seats = await Seat.find({ _id: { $in: seatIds } });

    if (seats.length !== seatIds.length) {
      res.status(404);
      throw new Error("Some seats were not found");
    }

    const updateSeats = await Seat.updateMany(
      { _id: { $in: seatIds } },
      req.body
    );

    res.status(200).json(updateSeats);
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllSeats, createSeat, selectSeats };
