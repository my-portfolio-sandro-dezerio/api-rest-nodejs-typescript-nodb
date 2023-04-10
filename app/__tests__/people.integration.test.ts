import request from 'supertest';
import Server from '../Server';
import { Application } from 'express';
import { FactoryBuildFullObject } from '../people/factory';
import Service from '../people/service';
import { IPerson } from '../people/interface';

let server: Server;
let service: Service;
let app: Application;
let records_amount: number;

beforeAll(() => {
    server = new Server();
    service = new Service();
    app = server.getApp();
    records_amount = Math.floor(Math.random() * 50) + 1;
});

afterAll(() => {
    server.closeServer();
})

describe('PEOPLE - Integration Test', () => {
    test('GRID - Should return data', async () => {
        const people = FactoryBuildFullObject(records_amount);
        service.createMany(people);

        const response = await request(app)
            .get('/people')
            .expect(200);

        expect(response.body.length).toEqual(people.length);

        response.body.forEach((person: IPerson) => {
            expect(person.first_name).toBeDefined();
            expect(person.last_name).toBeDefined();
            expect(person.email).toBeDefined();
        })
    });

    test('GET BY ID - Should return data with a valid id', async () => {
        const index = Math.floor(Math.random() * records_amount);
        const people = service.grid();

        const person = people[index];

        const response = await request(app)
            .get(`/people/${person.id}`)
            .expect(200);

        expect(response.body.id).toBe(person.id);
        expect(response.body.first_name).toBe(person.first_name);
        expect(response.body.last_name).toBe(person.last_name);
    });

    test('GET BY ID - Should not return data with an invalid id', async () => {
        const id = '1';
    
        const response = await request(app)
            .get(`/people/${id}`)
            .expect(204);
        
        expect(response.body).toEqual({});
    });

    test('CREATE - Should create a person', async () => {
        const [payload] = FactoryBuildFullObject();

        const response = await request(app)
            .post(`/people`)
            .send(payload)
            .expect(201);

        expect(response.body.id).toBeDefined();
        expect(response.body.first_name).toBe(payload.first_name);
        expect(response.body.email).toBe(payload.email);

    });

    test('CREATE - Should not create a person with an email that already exists', async () => {
        const [person] = FactoryBuildFullObject();
        service.create(person);

        const payload = {
            ...FactoryBuildFullObject(),
            email: person.email
        }

        const error = { message: 'Email already exists.' };

        const response = await request(app)
            .post(`/people`)
            .send(payload)
            .expect(400);

        expect(response.body).toEqual(error);
    });

    test('UPDATE - Should update a person', async () => {
        const peopleToCreate = FactoryBuildFullObject(records_amount);
        service.createMany(peopleToCreate);

        const people = service.grid();
        
        const index = Math.floor(Math.random() * records_amount);
        
        const person = people[index];
        const [payload] = FactoryBuildFullObject();

        await request(app)
            .put(`/people/${person.id}`)
            .send(payload)
            .expect(200);
    });

    test('UPDATE - Should not update a person with an invalid id', async () => {
        const [peopleToCreate] = FactoryBuildFullObject();
        service.create(peopleToCreate);
        
        const [payload] = FactoryBuildFullObject();

        const response = await request(app)
            .put(`/people/123`)
            .send(payload)
            .expect(400);

        const error = { message: 'Person trying to update doesn\'t exist.' };

        expect(response.body).toEqual(error);
    });

    test('DELETE - Should delete a person', async () => {
        const peopleToCreate = FactoryBuildFullObject(records_amount);
        service.createMany(peopleToCreate);

        const people = service.grid();
        
        const index = Math.floor(Math.random() * records_amount);
        
        const person = people[index];

        await request(app)
            .delete(`/people/${person.id}`)
            .expect(200);
    });

    test('DELETE - Should not delete a person with an invalid id', async () => {
        const response = await request(app)
            .delete(`/people/123`)
            .expect(400);

        const error = { message: 'Person trying to delete doesn\'t exist.' };

        expect(response.body).toEqual(error);
    });
});