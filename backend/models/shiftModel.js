const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shiftSchema = new Schema(
  {
    caregiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Caregiver",
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shift", shiftSchema);
