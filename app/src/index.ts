import express from 'express';
import { applyAppRoutes } from "./routes/appRoutes";
import { Events, subscribeService } from "./services/subscribeService";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

applyAppRoutes(app);
subscribeService.subscribe(Events.PROCESSING_COMPLETED, (data) => console.log(data));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
