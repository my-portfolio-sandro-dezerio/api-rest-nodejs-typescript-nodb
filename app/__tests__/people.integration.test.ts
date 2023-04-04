import request from 'supertest';
import Server from '../Server';
import { IPerson } from '../people/interface';

const server = new Server();
const app = server.getApp();

afterAll(() => {
    server.closeServer();
})

describe('PEOPLE - Integration Test', () => {
    describe('GRID', () => {
        test('Should return data', async () => {
            const people: IPerson[] = [];
            const response = await request(app)
                .get('/people')
                .expect(200);

            expect(response.body).toEqual(people);
        });
    });

    describe('GET BY ID', () => {
        test('Should return data with a valid id', async () => {
            const id = '1';
            const response = await request(app)
                .get(`/people/${id}`)
                .expect(204);
        });

        test('Should not return data with an invalid id', async () => {
            const id = '1';
            const response = await request(app)
                .get(`/people/${id}`)
                .expect(204);
        });
    })
});