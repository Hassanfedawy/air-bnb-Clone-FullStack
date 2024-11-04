// lib/dbConnect.ts
import mongoose from 'mongoose';

// Ensure that the environment variable is defined
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

const connectDb = async (): Promise<void> => {
    // Check the current connection state
    if (mongoose.connection.readyState >= 1) {
        return; // Already connected
    }

    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw new Error('Database connection failed');
    }
};

export default connectDb;
