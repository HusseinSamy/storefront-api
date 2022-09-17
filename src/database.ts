import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config();

const ENV = process.env.ENV;

export let database: Pool;

export const {
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;

if(ENV === 'dev') {

    database = new Pool({
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        host: POSTGRES_HOST,
        password: POSTGRES_PASSWORD,
    })
}
if(ENV === 'test') {

    database = new Pool({
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        host: POSTGRES_HOST,
        password: POSTGRES_PASSWORD,
    })
}