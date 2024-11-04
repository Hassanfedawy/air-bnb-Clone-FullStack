import mongoose from "mongoose";

const Listing = new mongoose.Schema({
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
/*     userId: {type: Number},
 */}, { timestamps: true });

export default mongoose.models.Listing || mongoose.model("Listing", Listing);
