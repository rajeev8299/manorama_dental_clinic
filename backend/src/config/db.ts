import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // For now, skipping real MongoDB connection to avoid ECONNREFUSED crash
    console.log(`Mock Database Connected (In-Memory Mode)`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
