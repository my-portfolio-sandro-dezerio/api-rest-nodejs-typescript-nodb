import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

export default Factory.define('person').attrs({
    first_name: () => faker.name.firstName(),
    last_name: () => faker.name.lastName(),
    email: () => faker.internet.email()
});