const express = require('express');
const router = express.Router();
const { addPatient, searchPatient } = require('../controllers/patientController');

// ✅ Correct handler functions
router.post('/add', addPatient);
router.get('/search', searchPatient);

module.exports = router;
