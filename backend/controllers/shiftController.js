const Shift = require("../models/shiftModel");
const mongoose = require("mongoose");

// get all shifts
const getShifts = async (req, res) => {
  const shifts = await Shift.find({})
    .populate("caregiver", "caregiver_name")
    .populate("customer", "customer_name")
    .populate("patient", "patient_name")
    .populate("product", "product_name")
    .sort({ createdAt: -1 });

  res.status(200).json(shifts);
};

// get a single shift
const getShift = async (req, res) => {
  const { id } = req.params;

  const shift = await Shift.findOne({ shift_id: id })
    .populate("caregiver", "caregiver_id caregiver_name")
    .populate("customer", "customer_id customer_name")
    .populate("patient", "patient_id patient_name")
    .populate("product", "product_id product_name");

  if (!shift) {
    return res.status(404).json({ error: "No such shift" });
  }

  res.status(200).json(shift);
};

// create a new shift
const createShift = async (req, res) => {
  const {
    shift_id,
    caregiver_id,
    customer_id,
    patient_id,
    product_id,
    start_time,
    end_time,
  } = req.body;

  console.log(req.body); //testing bug

  let emptyFields = [];

  if (!shift_id) {
    emptyFields.push("shift_id");
  }
  if (!caregiver_id) {
    emptyFields.push("caregiver_id");
  }
  if (!customer_id) {
    emptyFields.push("customer_id");
  }
  if (!patient_id) {
    emptyFields.push("patient_id");
  }
  if (!product_id) {
    emptyFields.push("product_id");
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

  // Fetch the referenced documents
  const caregiver = await Caregiver.findOne({ caregiver_id });
  const customer = await Customer.findOne({ customer_id });
  const patient = await Patient.findOne({ patient_id });
  const product = await Product.findOne({ product_id });
  // Check if they exist
  if (!caregiver || !customer || !patient || !product) {
    return res.status(404).json({ error: "Referenced document not found" });
  }

  // add doc to db
  try {
    const shift = await Shift.create({
      shift_id,
      caregiver: caregiver._id,
      customer: customer._id,
      patient: patient._id,
      product: product._id,
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

  const shift = await Shift.findOneAndDelete({ shift_id: id });

  if (!shift) {
    return res.status(404).json({ error: "No such shift" });
  }

  res.status(200).json(shift);
};

// update a shift
const updateShift = async (req, res) => {
  const { id } = req.params;

  const shift = await Shift.findOneAndUpdate(
    { shift_id: id },
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
