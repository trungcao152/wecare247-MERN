// shiftController.js
const Caregiver = require("../models/caregiverModel");
const Customer = require("../models/customerModel");
const Patient = require("../models/patientModel");
const Product = require("../models/productModel");
const Shift = require("../models/shiftModel");
const {
  adjustFreeTimeForShift,
} = require("../controllers/caregiverFreeTimeController");

// get all shifts
const getShifts = async (req, res) => {
  const shifts = await Shift.find({})
    .populate("caregiver", "caregiver_id") // retrieve the custom id
    .populate("customer", "customer_id")
    .populate("patient", "patient_id")
    .populate("product", "product_id")
    .sort({ createdAt: -1 });

  res.status(200).json(shifts);
};

// get a single shift
const getShift = async (req, res) => {
  const { id } = req.params;

  const shift = await Shift.findOne({ shift_id: id })
    .populate("caregiver", "caregiver_id") // retrieve the custom id
    .populate("customer", "customer_id")
    .populate("patient", "patient_id")
    .populate("product", "product_id");

  if (!shift) {
    return res.status(404).json({ error: "No such shift" });
  }

  res.status(200).json(shift);
};

// Check if the end time is after the start time
const isEndTimeAfterStartTime = (start, end) => {
  return end.getTime() > start.getTime();
};

// create a new shift
const createShift = async (req, res) => {
  let {
    shift_id,
    caregiver_id,
    customer_id,
    patient_id,
    product_id,
    start_time,
    end_time,
  } = req.body;

  start_time = new Date(req.body.start_time);
  end_time = new Date(req.body.end_time);

  if (!isEndTimeAfterStartTime(start_time, end_time)) {
    return res.status(400).json({ error: "End time must be after start time" });
  }

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
  const caregiver = await Caregiver.findOne({ caregiver_id: caregiver_id });
  const customer = await Customer.findOne({ customer_id: customer_id });
  const patient = await Patient.findOne({ patient_id: patient_id });
  const product = await Product.findOne({ product_id: product_id });

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

    // <-- Adjust the caregiver's free time immediately after creating the shift
    await adjustFreeTimeForShift(caregiver._id, start_time, end_time);

    console.log("Created Shift: ", shift); // log the created shift
    res.status(200).json(shift);
  } catch (error) {
    console.error("Error creating shift: ", error); // log any errors that occur
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

  let updateData = { ...req.body };

  if (updateData.start_time) {
    updateData.start_time = new Date(updateData.start_time);
  }
  if (updateData.end_time) {
    updateData.end_time = new Date(updateData.end_time);
  }

  if (
    updateData.start_time &&
    updateData.end_time &&
    !isEndTimeAfterStartTime(updateData.start_time, updateData.end_time)
  ) {
    return res.status(400).json({ error: "End time must be after start time" });
  }

  const shift = await Shift.findOneAndUpdate({ shift_id: id }, updateData, {
    new: true,
    runValidators: true,
  });

  if (!shift) {
    return res.status(404).json({ error: "No such shift" });
  }

  // <-- Adjust the caregiver's free time after updating the shift. You might want to add further logic if you only want to adjust when start_time or end_time has changed.
  await adjustFreeTimeForShift(
    shift.caregiver,
    updateData.start_time || shift.start_time,
    updateData.end_time || shift.end_time
  );

  res.status(200).json(shift);
};

module.exports = {
  getShifts,
  getShift,
  createShift,
  deleteShift,
  updateShift,
};
