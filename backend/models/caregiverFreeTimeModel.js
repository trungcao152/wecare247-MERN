const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CaregiverFreeTimeSchema = new Schema({
  caregiver_id: {
    type: Schema.Types.ObjectId,
    ref: "Caregiver",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  free_slots: [
    {
      start_time: {
        type: String,
        required: true,
      },
      end_time: {
        type: String,
        required: true,
      },
    },
  ],
});

// To ensure that there is only one entry per caregiver per day
CaregiverFreeTimeSchema.index({ caregiver_id: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("CaregiverFreeTime", CaregiverFreeTimeSchema);
