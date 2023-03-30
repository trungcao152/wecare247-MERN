const Caregiver = require("../models/caregiverModel");
const mongoose = require("mongoose");

// get all caregivers
const getCaregivers = async (req, res) => {
  const caregivers = await Caregiver.find({}).sort({ createdAt: -1 });

  res.status(200).json(caregivers);
};

//get a single caregiver
const getCaregiver = async (req, res) => {
  const { id } = req.params;

  const caregiver = await Caregiver.findOne({ _id: id });

  if (!caregiver) {
    return res.status(404).json({ error: "No such caregiver" });
  }

  res.status(200).json(caregiver);
};

// create a new caregiver
const createCaregiver = async (req, res) => {
  const {
    employee_id,
    employee_name,
    current_address,
    birth_year,
    skill_level,
    preferred_working_location,
    working_status,
    employee_phone,
    employee_gender,
    national_id,
    national_id_issue_date,
    age,
  } = req.body;

  // Check if employee_id is unique
  const existingCaregiver = await Caregiver.findOne({ employee_id });

  if (existingCaregiver) {
    return res.status(400).json({ error: "employee_id must be unique" });
  }

  // add doc to db
  try {
    const caregiver = await Caregiver.create({
      _id: employee_id,
      employee_name,
      current_address,
      birth_year,
      skill_level,
      preferred_working_location,
      working_status,
      employee_phone,
      employee_gender,
      national_id,
      national_id_issue_date,
      age,
    });
    res.status(200).json(caregiver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a caregiver
const deleteCaregiver = async (req, res) => {
  const { id } = req.params;

  const caregiver = await Caregiver.findOneAndDelete({ _id: id });

  if (!caregiver) {
    return res.status(404).json({ error: "No such caregiver" });
  }

  res.status(200).json(caregiver);
};

// update a caregiver
const updateCaregiver = async (req, res) => {
  const { id } = req.params;

  const caregiver = await Caregiver.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!caregiver) {
    return res.status(404).json({ error: "No such caregiver" });
  }
  res.status(200).json(caregiver);
};

module.exports = {
  getCaregivers,
  getCaregiver,
  createCaregiver,
  deleteCaregiver,
  updateCaregiver,
};
