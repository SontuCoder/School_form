import mongoose from "mongoose";
const URL = "mongodb://127.0.0.1:27017/Student";
const connectionDb = async()=>{
    try{
        await mongoose.connect(URL);
        console.log("Db connected");
    } catch (err) {
        console.log("Db not connected");
        process.exit(0);
    }
};
export default connectionDb;