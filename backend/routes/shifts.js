const express = require("express");
const router = express.Router();
const {
  getShifts,
  getShift,
  createShift,
  deleteShift,
  updateShift,
} = require("../controllers/shiftController");

// Get all shifts
router.get("/", getShifts);

// Get a single shift by ID
router.get("/:id", getShift);

// Create a new shift
router.post("/", createShift);

// Update a shift
router.put("/:id", updateShift);

// Delete a shift
router.delete("/:id", deleteShift);

module.exports = router;
