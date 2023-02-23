const express = require("express");

const { FlightModel } = require("../models/Flight.model");

const flightRouter = express.Router();

//R   O   U    T    E    S

//G E T    F L I G H T S

flightRouter.get("/flights", async (req, res) => {
  try {
    const flights = await FlightModel.find();
    res.send(flights);
    console.log("flights", flights);
  } catch (err) {
    console.log(err);
  }
});

//GET FLIGHT BY ID

flightRouter.get("/flights/:id", async (req, res) => {
  const id = req.params.id;
  //console.log("id is", id);
  try {
    const flight = await FlightModel.find({ _id: id });
    res.send(flight);
    console.log("flights", flight);
  } catch (err) {
    console.log(err);
  }
});

//P O S T  F L I G H T S
flightRouter.post("/flights", async (req, res) => {
  const payload = req.body;
  try {
    const new_flight = new FlightModel(payload);

    await new_flight.save();

    res.send({ msg: "Flight Added" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Failed to  Add Flight" });
  }
});

// PUT/PATCH

flightRouter.patch("/flights/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const flight = await FlightModel.find({ _id: id });

  try {
    await FlightModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ msg: "updated" });
  } catch (err) {
    res.send({ msg: "failed to update" });
  }
});

//DELETE
flightRouter.delete("/flights/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await FlightModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Deleted" });
  } catch (err) {
    res.send({ msg: "failed to Delete" });
  }
});

module.exports = { flightRouter };
