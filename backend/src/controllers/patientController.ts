import { Request, Response } from 'express';

// In-memory mock database
let mockPatients: any[] = [
  { _id: '1', name: 'Rahul Sharma', phone: '9876543210', age: 35, gender: 'Male', lastVisit: '2023-10-01', treatmentHistory: 'Teeth Cleaning' },
  { _id: '2', name: 'Priya Singh', phone: '8765432109', age: 28, gender: 'Female', lastVisit: '2023-09-15', treatmentHistory: 'Root Canal' }
];

export const getPatients = async (req: Request, res: Response) => {
  try {
    res.json(mockPatients);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createPatient = async (req: Request, res: Response) => {
  try {
    const { name, phone, age, gender, lastVisit, treatmentHistory } = req.body;
    
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    const newPatient = {
      _id: Date.now().toString(),
      name,
      phone,
      age,
      gender,
      lastVisit,
      treatmentHistory
    };

    mockPatients = [newPatient, ...mockPatients];
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

