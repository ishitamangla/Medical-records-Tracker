const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const connectDb = require("./config/db");
const path = require("path");
const cors = require("cors");
const userRouter = require("./routes/UserRoute");
const cookieParser = require("cookie-parser");


const port = process.env.PORT || 3000;
const allowedOrigins = [
  "http://localhost:5173"
];
app.use(
  cors({
    origin:allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"], // your Vite frontend URL
    credentials: true,
  })
);


connectDb();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);
app.listen(port, () => {
  console.log("Server is running at port 3000");
});
