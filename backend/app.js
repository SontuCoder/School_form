import express from "express";
const app = express();
import connectionDb from "./config/db.js";
import router from "./routers/router.js";

app.use(express.json());

connectionDb();

app.get('/',(req,res)=>{
    res.send("hello");
})

app.use("/api/student",router);

const PORT = process.env.port || 4000;

app.listen(PORT,()=>{
    console.log(`Server start on ${PORT}`);
});
