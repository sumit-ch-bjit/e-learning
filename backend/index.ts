import dotenv from 'dotenv';
import { app } from './app'
import connectDB from './config/db';

//For env File 
dotenv.config();
connectDB();

// const app: Application = express();s
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});