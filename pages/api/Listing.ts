import connectDb from "@/libs/dbconnect";
import Listing from "@/Schema/ListingSchema"; // Import the Listing model
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDb(); // Connect to the database

    if (req.method === 'POST') {
        try {
            const body = req.body; // Access the body directly for POST requests

            // Validate input
            const { title, imageSrc, description, category, roomsCount, bathRoomsCount, guestsCount, location, price } = body;
            if (!title || !imageSrc || !description || !category || roomsCount < 0 || bathRoomsCount < 0 || guestsCount < 0 || !location || price <= 0) {
                return res.status(400).json({ error: 'Please provide valid input for all fields.' });
            }

            const listing = new Listing({
                title,
                imageSrc,
                description,
                category,
                roomsCount,
                bathRoomsCount,
                guestsCount,
                location,
                price,
                // Uncomment if you want to use userId
                // userId: null,
            });

            await listing.save(); // Save the listing to the database
            return res.status(201).json({ message: 'Listing created successfully', listing });
        } catch (error) {
            console.error('Error creating listing:', error); // Log the error
            return res.status(500).json({ error: 'Failed to create listing' });
        }
    } else {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
