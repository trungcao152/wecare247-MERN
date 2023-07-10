const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const caregiverSchema = new Schema(
  {
    caregiver_id: {
      type: String,
      required: true,
      unique: true,
    },
    caregiver_name: {
      type: String,
      required: true,
    },
    current_address: {
      type: String,
      required: true,
    },
    birth_year: {
      type: Number,
      required: true,
    },
    skill_level: {
      type: Number,
      required: true,
    },
    preferred_working_location: {
      type: String,
      required: true,
    },
    working_status: {
      type: String,
      required: false,
    },
    employee_phone: {
      type: String,
      required: true,
    },
    employee_gender: {
      type: String,
      required: true,
    },
    national_id: {
      type: String,
      required: true,
    },
    national_id_issue_date: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

caregiverSchema.set("toObject", { virtuals: true });
caregiverSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Caregiver", caregiverSchema);
