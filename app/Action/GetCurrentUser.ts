import { getServerSession } from "next-auth/next";
import authOptions from "@/pages/api/auth/[...nextauth]";
import dbConnect from "../../libs/dbconnect"; // Ensure this connects to your MongoDB database
import User from "../../Schema/UserSchema"; // Assuming you have a User model defined with Mongoose
import { getSession } from "next-auth/react";
export async function getSCurrentUser() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    // Connect to the database
    await dbConnect();

    const currentUser = await User.findOne({ email: session.user.email });

    if (!currentUser) {
      return null;
    }

    return {
      id: currentUser._id,
      email: currentUser.email,
      name: currentUser.name,
      updatedAt: currentUser.updatedAt?.toISOString(),
      createdAt: currentUser.createdAt?.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
