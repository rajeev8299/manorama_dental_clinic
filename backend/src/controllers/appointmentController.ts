import { Request, Response } from 'express';

// In-Memory store for appointments
let appointments: any[] = [
  { _id: '1', name: 'Test Patient', phone: '9876543210', date: '2026-10-10', time: '10:00 AM', status: 'Pending' }
];

export const submitAppointment = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, date, time, message } = req.body;

    if (!name || !phone || !date || !time) {
      return res.status(400).json({ error: 'Name, phone, date, and time are required.' });
    }

    const newAppointment = {
      _id: Math.random().toString(36).substr(2, 9),
      name, phone, email, date, time, message, status: 'Pending'
    };
    appointments.push(newAppointment);

    return res.status(201).json({ success: true, appointment: newAppointment, message: 'Appointment request received successfully.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const index = appointments.findIndex(a => a._id === req.params.id);
    
    if (index !== -1) {
      appointments[index].status = status;
      res.json(appointments[index]);
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
