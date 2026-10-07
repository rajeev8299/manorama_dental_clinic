import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    // In-memory Mock Auth
    if (username === 'admin' && password === 'admin123') {
      const token = jwt.sign(
        { id: '1', role: 'admin' },
        process.env.JWT_SECRET || 'secret123',
        { expiresIn: '30d' }
      );
      return res.json({
        _id: '1',
        username: 'admin',
        role: 'admin',
        token,
      });
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
