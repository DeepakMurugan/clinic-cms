const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patient_id: { type: String, required: true, unique: true },
  name: String,
  age: Number,
  gender: String,
  phone: String,
  email: String,
  address: String,
  emergencyContact: String,
  guardian_name: String,
  guardian_phone: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Patient", patientSchema);
