import mongoose, { Schema, Document } from "mongoose";

interface IListing extends Document {
    title: string;
    imageSrc: string;
    description: string;
    category: string;
    roomsCount: number;
    bathRoomsCount: number;
    guestsCount: number;
    location: {
        lat: number;
        lng: number;
    };
    price: number;
    country: string;
    // userId?: number; Uncomment if you add this field later
}

const ListingSchema: Schema = new Schema({
    title: { type: String, required: true },
    imageSrc: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    roomsCount: { type: Number, required: true },
    bathRoomsCount: { type: Number, required: true },
    guestsCount: { type: Number, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    price: { type: Number, required: true },
    country: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Listing || mongoose.model<IListing>("Listing", ListingSchema);
