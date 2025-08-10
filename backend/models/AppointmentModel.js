const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  files: [
    {
      filename: String,
      fileUrl: String,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  bodyOrgan: {
    type: String,
    required: true,
  },
  medicine: {
    type: [String], // In case there are multiple medicines
    default: [],
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
