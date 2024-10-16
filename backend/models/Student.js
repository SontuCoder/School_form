import mongoose from "mongoose";

const student = mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique: true
    },
    stu_class:{
        type: Number,
        required:true,
        min:1,
        max:12
    },
    password:{
        type:String,
        required:true,
    }
});

const Student = mongoose.model("Student",student);

export default Student;