import express from 'express';
import { applyAppRoutes } from "./routes/appRoutes";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

applyAppRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});