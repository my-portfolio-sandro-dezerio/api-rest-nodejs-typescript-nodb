import { IPersonBody } from "../people/interface";
import Factory from "../people/factory";
import Service from "../people/service";

let service: Service;

const people_init: IPersonBody[] = [];
let records_amount: number;

beforeAll(() => {
    service = new Service();
    records_amount = Math.floor(Math.random() * 50) + 1;
})

beforeEach(() => {
    people_init.length = 0;

    people_init.push(...Factory.buildList(records_amount));
    service.createMany(people_init);
});

afterEach(() => {
    service.clean();
});

describe('PEOPLE - Services - Unit Testing', () => {
    test('GRID - Should return data', () => {
        const people = service.grid();

        expect(people.length).toBe(people_init.length);
    });

    test('GET BY ID - Should return data with valid id', () => {
        const index = Math.floor(Math.random() * records_amount);
        const people = service.grid();

        const person_by_id = service.getById(people[index].id);

        expect(person_by_id!.id).toBe(people[index].id);
    });

    test('GET BY ID - Should not return data with a not existing id', () => {
        const person_by_id = service.getById('123');

        expect(person_by_id).toBeUndefined;
    });

    test('CREATE - Should create a person', () => {
        const payload = Factory.build();

        const person = service.create(payload);

        expect(person.first_name).toBe(payload.first_name);
        expect(person.last_name).toBe(payload.last_name);
        expect(person.id).toBeTruthy();
    });

    test('UPDATE - Should update a person with a valid id', () => {
        const index = Math.floor(Math.random() * records_amount);

        const people = service.grid();

        const id = people[index].id;

        const payload = {
            first_name: 'Sandro modificado',
            last_name: 'Dezerio modificado',
            email: 'sandro@gmail.com'
        };

        service.update(id, payload);

        const person = service.getById(id);

        expect(person!.first_name).toBe(payload.first_name);
        expect(person!.last_name).toBe(payload.last_name);
        expect(person!.updated_at).toBeTruthy();
    });

    test('DELETE - Should delete a person', () => {
        const index = Math.floor(Math.random() * records_amount);

        const people = service.grid();

        const id = people[index].id;

        service.delete(id);

        const peopleWithoutDeleted = service.grid();

        expect(peopleWithoutDeleted.length).toBe(people_init.length - 1);
    });
});