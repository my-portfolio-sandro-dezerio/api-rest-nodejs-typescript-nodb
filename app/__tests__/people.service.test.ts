import { IPersonBody } from "../people/interface";
import Service from "../people/service";

const service = new Service();
const people_init: IPersonBody[] = [];

beforeEach(() => {
    people_init.length = 0;

    people_init.push({
        first_name: 'first name 1',
        last_name: 'last name 1',
        email: 'first@gmail.com'
    }, {
        first_name: 'first name 2',
        last_name: 'last name 2',
        email: 'second@gmail.com'
    });

    service.createMany(people_init);
});

afterEach(() => {
    service.clean();
})

describe('PEOPLE - Services - Unit Testing', () => {
    describe('GRID', () => {
        test('Should return data', () => {
            const people = service.grid();
    
            expect(people.length).toBe(people_init.length);
        });
    })

    describe('GET BY ID', () => {
        test('Should return data with valid id', () => {
            const [ person ] = service.grid();

            const person_by_id = service.getById(person.id);

            expect(person_by_id!.id).toBe(person.id);
        });

        test('Should not return data with a not existing id', () => {
            const person_by_id = service.getById('123');

            expect(person_by_id).toBeUndefined;
        });
    });

    describe('CREATE', () => {
        test('Should create a person', () => {
            const payload = {
                first_name: 'Sandro',
                last_name: 'Dezerio',
                email: 'sandro@gmail.com'
            };

            const person = service.create(payload);

            expect(person.first_name).toBe(payload.first_name);
            expect(person.last_name).toBe(payload.last_name);
            expect(person.id).toBeTruthy();
        });
    });

    describe('UPDATE' , () => {
        test('Should update a person with a valid id', () => {
            const people = service.grid();

            const id = people[0].id;

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
    });

    describe('DELETE', () => {
        test('Should delete a person', () => {
            const people = service.grid();

            const id = people[0].id;

            service.delete(id);

            const peopleWithoutDeleted = service.grid();

            expect(peopleWithoutDeleted.length).toBe(people_init.length - 1);
        });
    });
});