import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}))
app.use("/api/v1/dalle", dalleRoutes)

app.get('/', async (req, res)=>{
    res.send("Hello from DALL-E");
})

const port = process.env.PORT || 8080
const startServer = async ()=>{

    try {
        app.listen(port,()=>{console.log("Server has started on port localhost:8080")})
    } catch (error) {
        console.log(error);
    }
}
startServer()