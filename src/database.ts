import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config();

export const {
    POSTGRES_DB,
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;

export const database = new Pool({
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    password: POSTGRES_PASSWORD,
})