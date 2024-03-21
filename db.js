import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/skyGoal"
const db = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("DB Connected")
    }
    catch (error) {
        console.error(error)
    }
}

export default db;