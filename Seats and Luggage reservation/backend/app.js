const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const seatRoutes = require("./routes/seatRoutes");
const luggageRoutes = require("./routes/luggageRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDatabase = require("./config/dbConnection");

const app = express();

// Mongo DB connection
connectDatabase();

//middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);

//routes
app.use("/api/v1/seat", seatRoutes);
app.use("/api/v1/luggage", luggageRoutes);
app.use("/api/v1/payment", paymentRoutes);

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listning to port:${PORT}`);
});
