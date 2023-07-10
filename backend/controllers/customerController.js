const Customer = require("../models/customerModel");
const mongoose = require("mongoose");

// get all customers
const getCustomers = async (req, res) => {
  const customers = await Customer.find({}).sort({ createdAt: -1 });
  res.status(200).json(customers);
};

// get one customer
const getCustomer = async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findById({ customer_id: id });
  if (!customer) {
    res.status(404).json({ message: "Customer not found" });
  } else {
    res.status(200).json(customer);
  }
};

// create a customer
const createCustomer = async (req, res) => {
  const {
    customer_id,
    customer_name,
    customer_phone,
    customer_email,
    customer_birthday,
    customer_address,
    customer_creator,
    customer_type,
  } = req.body;

  let emptyFields = [];

  if (customer_id) {
    emptyFields.push("customer_id");
  }
  if (!customer_name) {
    emptyFields.push("customer_name");
  }
  if (!customer_phone) {
    emptyFields.push("customer_phone");
  }
  if (!customer_email) {
    emptyFields.push("customer_email");
  }
  if (!customer_birthday) {
    emptyFields.push("customer_birthday");
  }
  if (!customer_address) {
    emptyFields.push("customer_address");
  }
  if (!customer_creator) {
    emptyFields.push("customer_creator");
  }
  if (!customer_type) {
    emptyFields.push("customer_type");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }

  // Check if customer_id is unique
  const existingCustomer = await Customer.findOne({ customer_id });

  if (existingCustomer) {
    return res
      .status(400)
      .json({ error: "customer_id must be unique", emptyFields });
  }

  // add doc to db
  try {
    const customer = await Customer.create({
      customer_id,
      customer_name,
      customer_phone,
      customer_email,
      customer_birthday,
      customer_address,
      customer_creator,
      customer_type,
    });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a customer
const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findOneAndDelete({ customer_id: id });

  if (!customer) {
    return res.status(404).json({ error: "No such customer" });
  }

  res.status(200).json(customer);
};

// update a customer
const updateCustomer = async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findOneAndUpdate(
    { customer_id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!customer) {
    return res.status(404).json({ error: "No such customer" });
  }
  res.status(200).json(customer);
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
