import { queueService } from "../services/queueService";

const statuses = {
    PROCESSING: 202,
    INTERNAL_SERVER_ERROR: 500,
}

const handleSuccess = (response, result: any): void => {
    response.status(statuses.PROCESSING).send(result)
}

const handleError = (response, error: any): void => {
    response.status(statuses.INTERNAL_SERVER_ERROR).send(error)
}

class AppController {
    public async processIds(req, res): Promise<void> {
        try {
            const result = await queueService.addBulk(
                queueService.processIdsQueue,
                'My message',
                req.body,
            );
            handleSuccess(res, result)

        } catch (e) {
            handleError(res, e)
        }
    }
}

export const appController = new AppController();