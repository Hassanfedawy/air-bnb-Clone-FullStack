// models/User.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
    id?: string; // Ensure this is a string
    name: string;
    email: string;
    password: string;
    hashedPassword?:string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
/*     id: {type: String , required:true},
 */    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    hashedPassword:{type: String, required: false }
});

// Add id to the User model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
