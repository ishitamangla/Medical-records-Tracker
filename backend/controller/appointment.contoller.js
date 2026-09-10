const Appointment = require("../models/AppointmentModel");
const cloudinary = require("../config/cloudinary");

async function addAppointment(req, res) {
  try {
    const { date, doctor, hospital, bodyOrgan, medicine, title, notes, files } =
      req.body;

    console.log("ADD APPOINTMENT HIT");
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    console.log("FILES:", req.files);


      if (!date || !title) {
        return res
          .status(400)
          .json({ success: false, message: "Required fields missing" });
      }

      const fileData = (req.files || []).map((file) => ({
            filename: file.originalname,
            fileUrl: file.path,
            publicId: file.filename, // Store the public ID of the file in Cloudinary
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

    return res
        .status(201)
        .json({ success: true, message: "Appointment added", appointment });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  const fetchAppointments = async (req, res) => {
    try {
      const userId = req.user.id;
      const appointments = await Appointment.find({ user: userId }).sort({
        date: -1,
      });

      if(appointments.length === 0){
        return res.status(404).json({
            success:false,message:"no appintments found"});
      }

      return res.status(200).json({
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
  };

  const editAppointment = async(req,res)=>{
    try{
        const {id} = req.params;

        const appointment = await Appointment.findOne({_id:id,user:req.user.id});

        if(!appointment){
            return res.status(404).json({
                success:false,
                message:"appointment not found"
            })
        }

        const { date, doctor, hospital, bodyOrgan, medicine, title, notes,files } = req.body;


        if (date) appointment.date = date;
        if (doctor) appointment.doctor = doctor;
        if (hospital) appointment.hospital = hospital;
        if (bodyOrgan) appointment.bodyOrgan = bodyOrgan;
        if (medicine) appointment.medicine = medicine.split(",");
        if (title) appointment.title = title;
        if (notes !== undefined) appointment.notes = notes;

        const oldFiles = appointment.files || [];
        const keptFiles = files ? JSON.parse(files) : [];

        const keptUrls = keptFiles.map((f) => f.fileUrl);
        const removedFiles = oldFiles.filter((f) => !keptUrls.includes(f.fileUrl));

        for (const file of removedFiles) {
            if (file.publicId) {
                try {
                    await cloudinary.uploader.destroy(file.publicId);
                } catch (err) {
                    console.log(`Failed to delete file ${file.publicId}:`, err.message);
                }
            }
        }

        const newFiles = (req.files || []).map((file) => ({
            filename: file.originalname,
            fileUrl: file.path,
            publicId: file.filename,
        }));

        appointment.files = [...keptFiles, ...newFiles];

        await appointment.save();

        return res.status(200).json({ success: true, message: "Appointment updated", appointment });
        } 
        catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

  async function deleteAppointment(req, res) {
    try{
        const { id } = req.params;

        const appointment = await Appointment.findOne({_id:id,user:req.user.id});
        
        if(!appointment){
            return res.status(404).json({
                success:false,
                message:"appointment not found"
            })
        }
        for (const file of appointment.files) {
            if (file.publicId) {
                try {
                    await cloudinary.uploader.destroy(file.publicId);
                } catch (err) {
                    console.log(`Failed to delete file ${file.publicId} from Cloudinary:`, err.message);
                }
            }
        }

        await Appointment.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:"appointment deleted successfully"
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }   
}



module.exports = {
    addAppointment, 
    fetchAppointments,
    editAppointment,
    deleteAppointment,
};
