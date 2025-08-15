const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/userdb");
const connectAppointmentDb = require("./config/appointmentdb");
const path = require("path");
const cors = require("cors");
const userRouter = require("./routes/UserRoute");
dotenv.config();
const port = process.env.PORT || 3000;
app.use(
  cors({
<<<<<<< HEAD
    origin: "https://medical-records-tracker-lv48.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"], // your Vite frontend URL
=======
    origin: "http://localhost:5173", // your Vite frontend URL
>>>>>>> c17b765bb2892cc15d4f95611f9a9566da07d122
    credentials: true,
  })
);
const connect = async () => {
  await connectDb();
  await connectAppointmentDb();
};
connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", userRouter);
app.listen(port, () => {
  console.log("Server is running at port 3000");
});
