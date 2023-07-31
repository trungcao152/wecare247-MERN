const mongoose = require("mongoose");
const CaregiverFreeTime = require("../models/caregiverFreeTimeModel");
const Caregiver = require("../models/caregiverModel");
const cron = require("node-cron");

// Get all caregivers' free time
const getAllCaregiversFreeTimeInRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .send({ message: "Start and end dates are required." });
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const freeTimeRecords = await CaregiverFreeTime.find({
      date: { $gte: start, $lte: end },
    });

    return res.status(200).send(freeTimeRecords);
  } catch (error) {
    console.error("Error fetching caregivers free time in range: ", error);
    return res.status(500).send({ message: "Internal Server Error." });
  }
};

// Add free time for a caregiver (typically only called when a new caregiver is registered)
const addInitialFreeTimeForCaregiver = async (caregiver_id) => {
  try {
    const date = new Date();
    date.setHours(0, 0, 0, 0); // Ensure it's the start of the day

    const newFreeTime = new CaregiverFreeTime({
      caregiver_id: caregiver_id,
      date,
      free_slots: [{ start_time: "00:00", end_time: "24:00" }],
    });

    await newFreeTime.save();
  } catch (error) {
    console.error("Error adding initial free time: ", error);
  }
};

// Auto-register free time for all caregivers at 0:00 everyday
const autoRegisterFreeTimeDaily = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const caregivers = await Caregiver.find({});

      for (let caregiver of caregivers) {
        const date = new Date();
        date.setHours(0, 0, 0, 0); // Ensure it's the start of the day

        let existingFreeTime = await CaregiverFreeTime.findOne({
          caregiver_id: caregiver._id,
          date,
        });

        if (!existingFreeTime) {
          await addInitialFreeTimeForCaregiver(caregiver._id);
        }
      }
    } catch (error) {
      console.error("Error auto-registering free time: ", error);
    }
  });
};

// Modify the free time when a shift is added/edited
const adjustFreeTimeForShift = async (caregiver_id, startTime, endTime) => {
  try {
    let currentDate = new Date(startTime);
    const endShiftDate = new Date(endTime);

    while (currentDate <= endShiftDate) {
      let segmentStart, segmentEnd;

      // For the start day
      if (
        currentDate.toISOString().slice(0, 10) ===
        startTime.toISOString().slice(0, 10)
      ) {
        segmentStart = startTime;
        segmentEnd = new Date(startTime);
        segmentEnd.setHours(23, 59, 59, 999);
      }
      // For the end day
      else if (
        currentDate.toISOString().slice(0, 10) ===
        endTime.toISOString().slice(0, 10)
      ) {
        segmentStart = new Date(currentDate);
        segmentStart.setHours(0, 0, 0, 0);
        segmentEnd = endTime;
      }
      // For any full days in between
      else {
        segmentStart = new Date(currentDate);
        segmentStart.setHours(0, 0, 0, 0);
        segmentEnd = new Date(currentDate);
        segmentEnd.setHours(23, 59, 59, 999);
      }

      // Adjust the free time for the current segment
      await adjustFreeTimeSegment(caregiver_id, segmentStart, segmentEnd);

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  } catch (error) {
    console.error("Error adjusting free time for multi-day shift: ", error);
  }
};

const adjustFreeTimeSegment = async (
  caregiver_id,
  segmentStart,
  segmentEnd
) => {
  try {
    const segmentDate = new Date(segmentStart);
    segmentDate.setHours(0, 0, 0, 0);

    const existingFreeTime = await CaregiverFreeTime.findOne({
      caregiver_id: caregiver_id,
      date: segmentDate,
    });

    if (existingFreeTime) {
      let newSlots = [];

      for (let slot of existingFreeTime.free_slots) {
        const slotStartTime = new Date(
          `${segmentDate.toISOString().slice(0, 10)}T${slot.start_time}:00Z`
        ).getTime();
        const slotEndTime = new Date(
          `${segmentDate.toISOString().slice(0, 10)}T${slot.end_time}:00Z`
        ).getTime();

        if (
          segmentEnd.getTime() <= slotStartTime ||
          segmentStart.getTime() >= slotEndTime
        ) {
          newSlots.push(slot);
        } else {
          if (segmentStart.getTime() > slotStartTime) {
            newSlots.push({
              start_time: slot.start_time,
              end_time: segmentStart.toISOString().slice(11, 16),
            });
          }
          if (segmentEnd.getTime() < slotEndTime) {
            newSlots.push({
              start_time: segmentEnd.toISOString().slice(11, 16),
              end_time: slot.end_time,
            });
          }
        }
      }

      existingFreeTime.free_slots = newSlots;
      await existingFreeTime.save();
    }
  } catch (error) {
    console.error("Error adjusting free time for shift segment: ", error);
  }
};

// Initialize auto registration
autoRegisterFreeTimeDaily();

module.exports = {
  adjustFreeTimeForShift,
  addInitialFreeTimeForCaregiver,
  getAllCaregiversFreeTimeInRange,
};
