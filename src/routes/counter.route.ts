import express, { Router } from 'express';
import CounterController from '../controllers/counter.controller';
import CounterValidator from '../validators/counter.validator';

const router = express.Router();

class CounterRoutes {
    counterController: CounterController;
    counterValidator: CounterValidator;
    constructor() {
        this.counterController = new CounterController();
        this.counterValidator = new CounterValidator();
    }
    route = (): Router => {
        router
            .route('/counters/search')
            .post(
                this.counterValidator.fetchCountersValidator,
                this.counterController.fetchCountersByCriteria
            ),
            router
                .route('/counters')
                .post(
                    this.counterController.create
                )
        return router;
    };
}

export default CounterRoutes;
