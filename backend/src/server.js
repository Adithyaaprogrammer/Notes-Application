import express from 'express';
import routes from './routes/routes.js';
import {connectDB} from './config/db.js';
// import {redis, ratelimiter } from './config/upstash.js';
import ratelimite from './middleware/ratelimiter.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT ;
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());
app.use(ratelimite);


app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  
  next();
});
app.use("/api/notes", express.json());
app.use("/api/notes", routes);

connectDB().then(() =>{
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
});

