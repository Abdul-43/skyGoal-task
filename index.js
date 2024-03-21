import express from "express"
import db from "./db.js";
import cors from "cors";
import userRouter from "./routes/user.js";

const app = express();
const PORT=8800;
app.use(express.json());
cors();

db();

app.use('/api',userRouter)

app.listen(PORT, () => {
    console.log("server connected 💫💫")
})