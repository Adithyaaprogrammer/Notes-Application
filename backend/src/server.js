import express from 'express';
import routes from './routes/routes.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use("/api/notes", express.json());
app.use("/api/notes", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});