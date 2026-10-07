import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  lastVisit: { type: String },
  treatmentHistory: { type: String },
}, {
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
