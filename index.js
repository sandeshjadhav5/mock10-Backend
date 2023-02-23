const express = require("express");

const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/User.routes");
const { flightRouter } = require("./routes/Flight.routes");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api", userRouter);
app.use("/api", flightRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }

  console.log(`listening to port : ${process.env.port}`);
});
