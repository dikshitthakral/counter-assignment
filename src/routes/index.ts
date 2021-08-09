import express from 'express';
import HealthCheckRoutes from './healthcheck.route';
import CounterRoutes from './counter.route';

const router = express.Router();

class Routes {
    healthCheckRoutes: HealthCheckRoutes;
    counterRoutes: CounterRoutes;

    constructor() {
        this.healthCheckRoutes = new HealthCheckRoutes();
        this.counterRoutes = new CounterRoutes();
    }
    appRoutes = (): express.IRouter => {
        router.use('/', this.healthCheckRoutes.route());
        router.use('/', this.counterRoutes.route());
        return router;
    }
}
export default Routes;