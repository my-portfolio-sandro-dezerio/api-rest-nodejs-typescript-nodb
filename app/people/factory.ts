import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { IPersonBody } from './interface';

const first_name = () => faker.name.firstName();
const last_name = () => faker.name.lastName();
const email = () => faker.internet.email();
const age = () => faker.date.birthdate({mode: 'age'});
const gender = () => faker.name.sexType();
const music_genre = () => faker.music.genre();

export const FactoryBuildFullObject = (amount: number = 1): IPersonBody[] => Factory.define('person').attrs({
    first_name,
    last_name,
    email,
    age,
    gender,
    music_genres : Factory.define('music_genre').attrs({
        genre: music_genre
    }).buildList(Math.floor(Math.random() * 50) + 1)
}).buildList(amount);