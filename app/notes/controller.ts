import { NextFunction, Request, Response } from "express";
import Service from "./service";

export default class Controller {
    service: Service = new Service();

    grid = (req: Request, res: Response, next: NextFunction) => {
        this.service.grid();
    }

    getById = (req: Request, res: Response, next: NextFunction) => {
        this.service.getById();
    }

    create = (req: Request, res: Response, next: NextFunction) => {
        this.service.create();
    }

    update = (req: Request, res: Response, next: NextFunction) => {
        this.service.update();
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        this.service.delete();
    }
}