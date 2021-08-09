import express from "express";
import * as bodyParser from "body-parser";
import { connectMongo } from "./common/database";
import { config } from './config/dbConfig';
import Routes from './routes/index';
import { errorHandler } from "./middlewares/errorHandler";


class Server {
    app: any;
    routes: any
    constructor() {
        this.app = null;
        this.routes = new Routes();
    }
    start() {
        try {
            this.app = express();
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use('/', this.routes.appRoutes());
            this.app.use(errorHandler);
            connectMongo();
            this.app.listen(config.port, () => {
                console.log(`Server is running on ${config.port} port.`);
            });
        } catch (err) {
            console.log(`error in starting server ${err}`);
            throw err;
        }
    }
}

const server = new Server();
server.start();
