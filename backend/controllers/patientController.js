const Patient = require("../models/patientModel");
const mongoose = require("mongoose");

// get all patients
const getPatients = async (req, res) => {
  const patients = await Patient.find({}).sort({ createdAt: -1 });
  res.status(200).json(patients);
};

// get one patient
const getPatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  if (!patient) {
    res.status(404).json({ message: "Patient not found" });
  } else {
    res.status(200).json(patient);
  }
};

// create a patient
const createPatient = async (req, res) => {
  const {
    _id,
    patient_name,
    patient_type,
    weight,
    physical_condition,
    memory_condition,
    ulcer,
    neural_disease,
    endo_tube,
    nebuliser,
    patient_condition,
  } = req.body;

  let emptyFields = [];

  if (!_id) {
    emptyFields.push("_id");
  }
  if (!patient_name) {
    emptyFields.push("patient_name");
  }
  if (!patient_type) {
    emptyFields.push("patient_type");
  }
  if (!weight) {
    emptyFields.push("weight");
  }
  if (!physical_condition) {
    emptyFields.push("physical_condition");
  }
  if (!memory_condition) {
    emptyFields.push("memory_condition");
  }
  if (!ulcer) {
    emptyFields.push("ulcer");
  }
  if (!neural_disease) {
    emptyFields.push("neural_disease");
  }
  if (!endo_tube) {
    emptyFields.push("endo_tube");
  }
  if (!nebuliser) {
    emptyFields.push("nebuliser");
  }
  if (!patient_condition) {
    emptyFields.push("patient_condition");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }

  // Check if patient_id is unique
  const existingPatient = await Patient.findOne({ _id });

  if (existingPatient) {
    return res
      .status(400)
      .json({ error: "patient_id must be unique", emptyFields });
  }

  // add doc to db
  try {
    const patient = await Patient.create({
      _id,
      patient_name,
      patient_type,
      weight,
      physical_condition,
      memory_condition,
      ulcer,
      neural_disease,
      endo_tube,
      nebuliser,
      patient_condition,
    });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a patient
const deletePatient = async (req, res) => {
  const { id } = req.params;

  const patient = await Patient.findOneAndDelete({ _id: id });

  if (!patient) {
    return res.status(404).json({ error: "No such patient" });
  }

  res.status(200).json(patient);
};

// update a patient
const updatePatient = async (req, res) => {
  const { id } = req.params;

  const patient = await Patient.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!patient) {
    return res.status(404).json({ error: "No such patient" });
  }
  res.status(200).json(patient);
};

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};
