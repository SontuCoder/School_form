import Student from "../models/Student.js";

// Login Function
export const login = async (req, res) => {
    const { name, pass } = req.body;
    if (!name || !pass) {
        return res.status(400).json({ message: "Fill all fields..." });
    }
    try {
        const user = await Student.findOne({ name: name });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            if (user.password === pass) {
                return res.status(200).redirect(`http://localhost:4000/api/student/student_detail?name=${user.name}`);
                // return res.status(200).json({ message:user });
            } else {  
                return res.status(401).json({ message: "Invalid password" });
            }
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Signup Function
export const signup = async (req, res) => {
    const { name, stu_class, pass, c_pass } = req.body;
    if (!name || !stu_class || !pass || !c_pass) {
        return res.status(400).json({ message: "Fill all fields..." });
    }
    if (pass === c_pass) {
        try {
            const user = await Student.findOne({ name: name });
            if (user) {
                return res.status(409).json({ message: "User already exists." });
            } else {
                const stu = new Student({
                    name: name,
                    stu_class: stu_class,
                    password: pass 
                });
                await stu.save();
                return res.status(200).json({ message: "Data saved successfully" });
            }
        } catch (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        return res.status(400).json({ message: "Passwords do not match." });
    }
}

// Student Data Function (Placeholder)
export const student_data = async (req, res) => {
    const {name}= req.query;
    if (!name) {
        return res.status(400).json({ message: "name is not fatched" });
    }
    try{
        const user = await Student.findOne({ name: name });
        if (!user) {
            return res.status(401).json({ message: "User doesn't exist." });
        } else {
            return res.status(200).json(user);
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
