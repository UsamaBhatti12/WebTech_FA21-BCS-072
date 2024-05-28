
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  nature: { type: String, required: true },
  comments: String,
  confirmed: { type: Boolean, default: false }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
