import Student from "../models/Student.js";

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
                // return res.status(200).redirect(`/student_detail?name=${user.name}`);
                return res.status(200).json({message:`hi ${name} ${pass}`});
            } else {
                return res.status(401).json({ message: "invalid pass" });
            }
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const signup = async (req, res) => {
    const { name, stu_class, pass, c_pass } = req.body;
    if (!name || !stu_class || !pass || !c_pass) {
        return res.status(400).json({ message: "Fill all fields..." });
    }
    if (pass === c_pass) {
        try {
            const user = await Student.findOne({ name: name });
            if (user) {
                return res.status(404).json({ message: "User already exist." });
            } else {
                const stu = new Student({
                    name:name,
                    stu_class:stu_class,
                    password: pass
                });
                await stu.save();
                return res.status(200).json({message:"data saved"});
            }
        } catch (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        return res.status(400).json({ message: "passwords are not matched." });
    }
}

export const student_data = async (req, res) => {
    res.send("student");
}


