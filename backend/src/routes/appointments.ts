import { Router } from 'express';
import { submitAppointment, getAppointments, updateAppointmentStatus } from '../controllers/appointmentController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public route
router.post('/', submitAppointment);

// Protected admin routes
router.get('/', protect, getAppointments);
router.put('/:id', protect, updateAppointmentStatus);

export default router;
