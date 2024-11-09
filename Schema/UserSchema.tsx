// models/User.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
}, { 
    timestamps: true // This will add `createdAt` and `updatedAt` fields
});

// Virtual `id` field
UserSchema.virtual('id').get(function () {
    return (this as any)._id.toHexString();
});


UserSchema.set('toJSON', {
    virtuals: true, // Ensure virtuals are included when converting to JSON
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
