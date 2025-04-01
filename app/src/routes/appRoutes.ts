import { Application, Request, Response } from "express";
import { appController } from "../controllers/appController";

export const applyAppRoutes = (app: Application) => {
    app.post('/process-ids', async (req: Request, res: Response) => appController.processIds(req, res))
}
