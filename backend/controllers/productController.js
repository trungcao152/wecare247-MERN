const Product = require("../models/productModel");
const mongoose = require("mongoose");

// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};

// Get product by ID
const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById({ product_id: id });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// create a new product
const createProduct = async (req, res) => {
  const { product_id, product_name, product_price, product_description } =
    req.body;

  let emptyFields = [];

  if (!product_id) {
    emptyFields.push("product_id");
  }
  if (!product_name) {
    emptyFields.push("product_name");
  }
  if (!product_price) {
    emptyFields.push("product_price");
  }
  if (!product_description) {
    emptyFields.push("product_description");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }

  // Check if product_id is unique
  const existingProduct = await Product.findOne({ product_id });

  if (existingProduct) {
    return res
      .status(400)
      .json({ error: "product_id must be unique", emptyFields });
  }

  // add doc to db
  try {
    const product = await Product.create({
      product_id,
      product_name,
      product_price,
      product_description,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndDelete({ product_id: id });

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

// update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndUpdate(
    { product_id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }
  res.status(200).json(product);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
