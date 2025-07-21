import express from 'express';
import routes from './routes/routes.js';
import {connectDB} from './config/db.js';
import path from 'path';
import ratelimite from './middleware/ratelimiter.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT ;
app.use(express.json()); // Middleware to parse JSON bodies
if(process.env.NODE_ENV !== 'production') {
app.use(cors());
}
app.use(ratelimite);


app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  
  next();
});
app.use("/api/notes", routes);
const __dirname = path.resolve();
if(process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname,"../frontend/dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}
connectDB().then(() =>{
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
});

