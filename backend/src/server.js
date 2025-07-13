import express from 'express';
import routes from './routes/routes.js';
import {connectDB} from './config/db.js';

const app = express();

connectDB();
const PORT = process.env.PORT ;
app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/notes", express.json());
app.use("/api/notes", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

