const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const User = require("../models/userModel");
const Appointment = require("../models/AppointmentModel");
const authMiddleware = require("../middleware/auth");
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandatory" });
  }
  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    return res
      .status(400)
      .json({ success: false, message: "User already exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "User not created" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return res.status(201).json({
    success: true,
    message: "User created",
    token,
    userDetails: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email or Password is Incorrect" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Email or Password is Incorrect" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      success: true,
      message: "Login Successfull",
      token,
      userDetails: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
const multer = require("multer");
const path = require("path");

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // saves inside /uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

const upload = multer({ storage });

router.post(
  "/add-details",
  authMiddleware,
  upload.array("files"), // matches frontend FormData key
  async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.files);
      const { date, doctor, hospital, bodyOrgan, medicine, title, notes } =
        req.body;

      if (!date || !title) {
        return res
          .status(400)
          .json({ success: false, message: "Required fields missing" });
      }

      const fileData = req.files.map((file) => ({
        filename: file.filename,
        fileUrl: `${req.protocol}://${req.get("host")}/uploads/${
          file.filename
        }`,
      }));

      const appointment = await Appointment.create({
        user: req.user.id,
        date,
        doctor,
        hospital,
        files: fileData,
        bodyOrgan,
        medicine: medicine ? medicine.split(",") : [],
        title,
        notes: notes || "",
      });

      res
        .status(201)
        .json({ success: true, message: "Appointment added", appointment });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router.get("/fetch-details", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await Appointment.find({ user: userId }).sort({
      date: -1,
    });

    // if (appointments.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "No Appointments Found" });
    // }

    res.status(200).json({
      success: true,
      message: "Appointment Details",
      appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
