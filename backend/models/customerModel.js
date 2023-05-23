const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_phone: {
      type: String,
      required: true,
    },
    customer_email: {
      type: String,
      required: true,
      unique: true,
    },
    customer_birthday: {
      type: Date,
      required: true,
    },
    customer_address: {
      type: String,
      required: true,
    },
    customer_creator: {
      type: String,
      required: false,
    },
    customer_type: {
      type: String,
      required: true,
      enum: ["old", "new"],
    },
  },
  { timestamps: true }
);

customerSchema.set("toObject", { virtuals: true });
customerSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Customer", customerSchema);
