import { Schema, Document, model } from 'mongoose';


// Document Interface
interface IUser extends Document {
    firstName: string;
    lastName: string | null;
    age: number;
    email: string | null;
    phoneNumber: number;
    address: string | null;
    isActive: boolean;
    refreshToken: string | null;
    password: string;
    role: 'admin' | 'superAdmin' | 'user';
}

// User Model Create
const UserSchema =  new Schema<IUser>({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        default: null,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        default: null,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        trim: true,
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    refreshToken: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "superAdmin", "user"],
        default: "user",
    }

},
{
    timestamps: true
})


const User = model<IUser>('User', UserSchema)


export default User;