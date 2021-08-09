import express, { Router } from 'express';
import HealthCheckController from '../controllers/healthCheck.controller';

const router = express.Router();

class HealthCheckRoutes {
    healthCheckController: HealthCheckController;
    constructor() {
        this.healthCheckController = new HealthCheckController();
    }
    route = (): Router => {
        router
            .route('/ping')
            .get(this.healthCheckController.ping);
        return router;
    }
}

export default HealthCheckRoutes;