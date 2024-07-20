import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ay701548:Be8zm6mc1tws6FyP@jhansiparamedical.xhchtit.mongodb.net/ZestPortal')
        .then(()=>console.log("DB connected"))
}