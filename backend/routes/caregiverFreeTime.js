const express = require("express");
const {
  adjustFreeTimeForShift,
  addInitialFreeTimeForCaregiver,
  getAllCaregiversFreeTimeInRange,
} = require("../controllers/caregiverFreeTimeController");

const router = express.Router();

// Placeholder
router.get("/allInRange", getAllCaregiversFreeTimeInRange);
router.post("/addInitial", addInitialFreeTimeForCaregiver);
router.put("/adjustTimeForShift", adjustFreeTimeForShift);

module.exports = router;
