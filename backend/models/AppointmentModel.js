const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  doctor: {
    type: String,
  },
  hospital: {
    type: String,
  },
  files: [
    {
      filename: String,
      fileUrl: String,
      publicId: String, // Store the public ID of the file in Cloudinary
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  bodyOrgan: {
    type: String,
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
