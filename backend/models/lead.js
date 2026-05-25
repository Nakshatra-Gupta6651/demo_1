const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({

  name: String,
  phone: String,
  email: String,

  insuranceType: String,

  // Pet Insurance
  petName: String,
  petAge: String,
  breed: String,
  vaccinated: String,
  weight: String,
  height: String,
  videoLink: String,

  // Motor Insurance
  vehicleType: String,
  registrationNumber: String,
  manufacturingYear: String,
  coverageType: String,

  // Health Insurance
  members: String,
  city: String,
  preExisting: String,
  sumInsured: String,

  // Other
  message: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Lead", leadSchema);