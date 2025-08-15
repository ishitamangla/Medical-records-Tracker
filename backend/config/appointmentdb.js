const mongoose = require("mongoose");
const connectAppointmentDb = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database Connected: ${dbConnection.connection.host}`);
  } catch (error) {
    console.log(`Database Could not be connected ${error.message}`);
  }
};
module.exports = connectAppointmentDb;
