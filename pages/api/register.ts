// pages/api/auth/signup.js
import dbConnect from '../../libs/dbconnect';  // Ensure the path is correct
import User from '../../Schema/UserSchema';  // Ensure this path is correct
import bcrypt from 'bcrypt';

export default async function handler(req:any, res:any) {
    if (req.method === 'POST') {
        await dbConnect();  // Connect to the database

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user instance
        const user = new User({ name, email, password:hashedPassword }); // Ensure you're using hashedPassword
        await user.save();

        res.status(201).json({ user });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
