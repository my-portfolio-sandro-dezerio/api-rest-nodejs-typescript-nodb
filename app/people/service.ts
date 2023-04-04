import { IPerson, IPersonBody } from "./interface";
import { v4 as uuid } from "uuid";

let people: IPerson[] = [];

export default class Service {
    grid = (): IPerson[] => {
        return people;
    }

    getById = (id: string): IPerson | undefined => {
        return people.find(p => p.id === id);
    }

    getByEmail = (email: string): IPerson | undefined => {
        return people.find(p => p.email === email);
    }

    create = (payload: IPersonBody): IPerson => {
        const new_person = {
            id: uuid(),
            ...payload,
            created_at: new Date(),
            updated_at: null
        };

        people.push(new_person);

        return new_person;
    }

    createMany = (payloads: IPersonBody[]) => {
        payloads.forEach(payload => {
            const new_person = {
                id: uuid(),
                ...payload,
                created_at: new Date(),
                updated_at: null
            };

            people.push(new_person);
        });
    }

    update = (id: string, payload: IPersonBody): void => {
        const personIndex: number = people.findIndex(p => p.id === id);

        people[personIndex] = {
            id,
            ...payload,
            created_at: people[personIndex].created_at,
            updated_at: new Date()
        };
    }

    delete = (id: string): void => {
        people = people.filter(p => p.id !== id);
    }

    clean = () => {
        people.length = 0;
    }
}
