// controllers/patientController.js
const Patient = require('../models/Patient');

// ✅ POST /api/patients/add
exports.addPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({ message: 'Patient added successfully' });
  } catch (error) {
    console.error('❌ Error saving patient:', error);
    res.status(500).json({ error: 'Failed to add patient' });
  }
};

// ✅ GET /api/patients/search
exports.searchPatient = async (req, res) => {
  const { term } = req.query;
  try {
    const patients = await Patient.find({
      $or: [
        { name: new RegExp(term, 'i') },
        { phone: new RegExp(term) },
        { patient_id: new RegExp(term, 'i') },
      ],
    });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
};
