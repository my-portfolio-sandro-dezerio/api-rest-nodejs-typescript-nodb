import { Router } from "express";
import Controller from "./controller";

export default class Routes {
    path = "/people";
    router: Router = Router();

    private controller: Controller = new Controller();

    constructor() {
        this.router
            .get('/', this.controller.grid)
            .get('/:id', this.controller.getById)
            .post('/', this.controller.create)
            .put('/:id', this.controller.update)
            .delete('/:id', this.controller.delete);
    }
}