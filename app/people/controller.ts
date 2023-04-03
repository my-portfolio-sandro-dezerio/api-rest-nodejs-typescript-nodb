import { NextFunction, Request, Response } from "express";
import { IPerson, IPersonBody } from "./interface";
import Service from "./service";

export default class Controller {
    service: Service = new Service();

    grid = (req: Request, res: Response, next: NextFunction) => {
        const skip = Number(req.query.skip);
        const take = Number(req.query.take);

        const people: IPerson[] = this.service.grid(skip, take);

        return res.status(200).json(people);
    }

    getById = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        const person: IPerson | undefined = this.service.getById(id);

        if(!person) {
            return res.sendStatus(204);
        }

        return res.status(200).json(person);
    }

    create = (req: Request, res: Response, next: NextFunction) => {
        const person: IPerson | undefined = this.service.getByEmail(req.body.email);

        if(person) {
            throw new Error('Email already exists.');
        }

        const newPerson: IPerson = this.service.create(req.body);

        return res.status(201).json(person);
    }

    update = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const body = req.params.body as unknown as IPersonBody;

        const person: IPerson | undefined = this.service.getById(id);

        if(!person) {
            return res.status(400).json('Person trying to update doesn\'t exist.');
        }

        this.service.update(id, body);
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        const person: IPerson | undefined = this.service.getById(id);

        if(!person) {
            return res.status(400).json('Person trying to delete doesn\'t exist.');
        }

        this.service.delete(id);

        return res.sendStatus(200);
    }
}