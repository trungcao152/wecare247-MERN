const Shift = require("../models/shiftModel");
const mongoose = require("mongoose");

// get all shifts
const getShifts = async (req, res) => {
  const shifts = await Shift.find({})
    .populate("caregiver", "employee_name")
    .populate("customer", "customer_name")
    .populate("patient", "patient_name")
    .populate("product", "product_price")
    .sort({ createdAt: -1 });

  res.status(200).json(shifts);
};

// get a single shift
const getShift = async (req, res) => {
  const { id } = req.params;

  const shift = await Shift.findOne({ _id: id })
    .populate("caregiver", "employee_name")
    .populate("customer", "customer_name")
    .populate("patient", "patient_name")
    .populate("product", "product_price");

  if (!shift) {
    return res.status(404).json({ error: "No such shift" });
  }

  res.status(200).json(shift);
};

// create a new shift
const createShift = async (req, res) => {
  const {
    caregiver_id,
    customer_id,
    patient_id,
    product,
    start_time,
    end_time,
  } = req.body;

  let emptyFields = [];

  if (!caregiver_id) {
    emptyFields.push("caregiver_id");
  }
  if (!customer_id) {
    emptyFields.push("customer_id");
  }
  if (!patient_id) {
    emptyFields.push("patient_id");
  }
  if (!product) {
    emptyFields.push("product");
  }
  if (!start_time) {
    emptyFields.push("start_time");
  }
  if (!end_time) {
    emptyFields.push("end_time");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }

  // add doc to db
  try {
    const shift = await Shift.create({
      caregiver_id,
      customer_id,
      patient_id,
      product,
      start_time,
      end_time,
    });
    res.status(200).json(shift);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a shift
const deleteShift = async (req, res) => {
  const { id } = req.params;

  const shift = await Shift.findOneAndDelete({ _id: id });

  if (!shift) {
    return res.status(404).json({ error: "No such shift" });
  }

  res.status(200).json(shift);
};

// update a shift
const updateShift = async (req, res) => {
  const { id } = req.params;

  const shift = await Shift.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!shift) {
    return res.status(404).json({ error: "No such shift" });
  }
  res.status(200).json(shift);
};

module.exports = {
  getShifts,
  getShift,
  createShift,
  deleteShift,
  updateShift,
};
