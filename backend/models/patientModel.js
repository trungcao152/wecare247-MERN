const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    patient_id: {
      type: String,
      required: true,
      unique: true,
    },
    patient_name: {
      type: String,
      required: true,
    },
    patient_type: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    physical_condition: {
      type: String,
      required: true,
    },
    memory_condition: {
      type: String,
      required: true,
      enum: ["normal", "forgetful"],
    },
    ulcer: {
      type: Boolean,
      required: true,
    },
    neural_disease: {
      type: Boolean,
      required: true,
    },
    endo_tube: {
      type: Boolean,
      required: true,
    },
    nebuliser: {
      type: Boolean,
      required: true,
    },
    patient_condition: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

patientSchema.set("toObject", { virtuals: true });
patientSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Patient", patientSchema);
