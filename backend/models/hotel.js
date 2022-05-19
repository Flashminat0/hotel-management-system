import mongoose from "mongoose";

const {Schema} = mongoose;

const hotelSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            default: "",
        },
        owner: {
            type: Schema.Types.ObjectId,
        },
        address: {
            type: JSON,
            required: true,
        },
        rooms: {
            type: JSON,
            default: [
                // {roomType: "", roomNumber: "", "beds": "", "price": "", "isAvailable": true, "time": ""},
            ],
        },
        image: {
            type: JSON,
        }
    },
    {timestamps: true},
);

export default mongoose.model("Hotel", hotelSchema);
