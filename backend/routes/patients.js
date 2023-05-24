const express = require("express");
const router = express.Router();
const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

// Get all patients
router.get("/", getPatients);

// Get a single patient by ID
router.get("/:id", getPatient);

// Create a new patient
router.post("/", createPatient);

// Update a patient
router.put("/:id", updatePatient);

// Delete a patient
router.delete("/:id", deletePatient);

module.exports = router;
