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
    _id,
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

  let emptyFields = [];

  if (!_id) {
    emptyFields.push("_id");
  }
  if (!employee_name) {
    emptyFields.push("employee_name");
  }
  if (!current_address) {
    emptyFields.push("current_address");
  }
  if (!birth_year) {
    emptyFields.push("birth_year");
  }
  if (!skill_level) {
    emptyFields.push("skill_level");
  }
  if (!preferred_working_location) {
    emptyFields.push("preferred_working_location");
  }
  // working_status can be null
  // if (!working_status) {
  //  emptyFields.push("working_status");
  if (!employee_phone) {
    emptyFields.push("employee_phone");
  }
  if (!employee_gender) {
    emptyFields.push("employee_gender");
  }
  if (!national_id) {
    emptyFields.push("national_id");
  }
  if (!national_id_issue_date) {
    emptyFields.push("national_id_issue_date");
  }
  if (!age) {
    emptyFields.push("age");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }

  // Check if employee_id is unique
  const existingCaregiver = await Caregiver.findOne({ _id });

  if (existingCaregiver) {
    return res
      .status(400)
      .json({ error: "employee_id must be unique", emptyFields });
  }

  // add doc to db
  try {
    const caregiver = await Caregiver.create({
      _id,
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
