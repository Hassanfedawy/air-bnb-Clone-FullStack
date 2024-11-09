import connectDb from "@/libs/dbconnect";
import Listing from "../../Schema/ListingSchema";

export default async function GetListing() {
    try {
        await connectDb(); // Ensure database is connected

        const listings = await Listing.find({}); // Retrieve all listings
        return listings;
    } catch (error: any) {
        throw new Error(error.message); // Improved error handling
    }
}
