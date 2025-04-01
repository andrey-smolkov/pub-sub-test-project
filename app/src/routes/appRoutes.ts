import { Application } from "express";
import { appController } from "../controllers/appController";


export const applyAppRoutes = (app: Application) => {
    app.post('/process-ids', async (req, res) => appController.processIds(req, res))
}