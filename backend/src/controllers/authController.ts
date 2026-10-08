import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    // Legacy mock auth is disabled.
    // Use Supabase Authentication directly in the frontend instead.
    return res.status(401).json({ error: 'Legacy mock authentication is disabled. Please use Supabase Auth.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
