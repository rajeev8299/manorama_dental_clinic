import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import appointmentRoutes from './routes/appointments';
import authRoutes from './routes/auth';
import patientRoutes from './routes/patientRoutes';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/patients', patientRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Manorama Dental Clinic API is running.' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
