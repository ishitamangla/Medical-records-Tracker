const express = require("express");
const router = new express.Router();
const authMiddleware = require("../middleware/auth");
const UserController = require("../controller/user.controller");
const upload = require("../middleware/upload");
const AppointmentController = require("../controller/appointment.contoller");

/* POST / */
router.post("/", (req, res) => {
  console.log("User Route");
  res.send("Hello from User Route");
});

/*POST /register */

router.post("/register", async (req, res) => {
  try {
    await UserController.registerUser(req, res);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


/*POST /login */

router.post("/login", async (req, res) => {
  try {
    await UserController.loginUser(req, res);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


/*GET /verify */

router.get("/verify",authMiddleware,(req,res)=>{
  res.status(200).json({message : "Authorized",user:req.user});
})


/*POST /add-details */

//upload.array is multer middleware 

router.post("/add-details",authMiddleware,
  async (req, res,next) => {
    upload.array("files")(req, res, (err) => {
      if (err) {
        console.log("upload error :" ,err);
        console.log(`Error uploading files: ${err.message}`);
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      await AppointmentController.addAppointment(req, res);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
  }
);

/*GET /fetch-details */

router.get("/fetch-details", authMiddleware, async (req, res) => {
  try {
    await AppointmentController.fetchAppointments(req, res);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


/*PUT /edit-details/:id */

router.put("/edit-details/:id", authMiddleware, (req, res, next) => {
    upload.array("files")(req, res, (err) => {
      if (err) return res.status(400).json({ success: false, message: err.message });
      next();
    });
  },
  async (req, res) => {
  try {
    await AppointmentController.editAppointment(req, res);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


/*DELETE /delete-details/:id */

router.delete("/delete-details/:id", authMiddleware, async (req, res) => { 
  try{
    await AppointmentController.deleteAppointment(req, res);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
