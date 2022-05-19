import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            default: "",
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        role: {
            type: [String],
            default: ["traveler"],
            enum: ["traveler", "hotel-owner", "taxi-driver", "admin"],
        },
        room: {
            type: JSON,
            default: [],
        }
    },
    {timestamps: true},
);

export default mongoose.model("User", userSchema);
