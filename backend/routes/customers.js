const express = require("express");
const router = express.Router();
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

// Get all customers
router.get("/", getCustomers);

// Get a single customer by ID
router.get("/:id", getCustomer);

// Create a new customer
router.post("/", createCustomer);

// Update a customer
router.put("/:id", updateCustomer);

// Delete a customer
router.delete("/:id", deleteCustomer);

module.exports = router;
