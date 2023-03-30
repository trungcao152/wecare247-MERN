const express = require("express");
const {
  getCaregivers,
  getCaregiver,
  createCaregiver,
  deleteCaregiver,
  updateCaregiver,
} = require("../controllers/caregiverController");

const router = express.Router();

//Get all caregivers
router.get("/", getCaregivers);

// Get a single caregiver
router.get("/:id", getCaregiver);

// POST a new caregiver
router.post("/", createCaregiver);

// DELETE a caregiver
router.delete("/:id", deleteCaregiver);

// UPDATE caregiver
router.patch("/:id", updateCaregiver);

module.exports = router;
