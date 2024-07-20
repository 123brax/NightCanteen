import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.JWT_SECRET)
        .then(()=>console.log("DB connected"))
}