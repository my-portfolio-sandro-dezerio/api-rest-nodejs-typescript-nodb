import express, { Application } from 'express';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';

import PeopleRoutes from './people/routes';

export default class Server {
    public app: Application;
    private server: any;

    constructor() {
        this.app = express();

        this.init();
        this.routes();
    }

    init() { 
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(morgan('combined'));

        this.app.use(cors());

        this.server = this.app.listen(config.port, () => {
            console.log(`API running on port ${config.port}`);
        });
    }

    routes() {
        const routes = [new PeopleRoutes()];

        routes.forEach(route => {
            this.app.use(route.path, route.router)
        });
    }

    getApp() {
        return this.app;
    }

    closeServer() {
        this.server.close();
    }
}
