import { database } from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config();

export interface IUser {
    id?: number,
    firstName: string,
    lastName: string, 
    password: string
}

export class UsersModel {
    async index (): Promise<IUser[]>{
        try{
            const connection = await database.connect(); 
            const sql = `SELECT * FROM users`;
            const result = await database.query(sql);
            connection.release();
            return result.rows;
        }
        catch(err){
            throw new Error(`error while accessing the database: ${err}`);  
        }
    }
    async show (id: number): Promise<IUser>{
        try{
            const connection = await database.connect(); 
            const sql = `SELECT * FROM users WHERE id = $1`;
            const result = await database.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`error while accessing the database: ${err}`);
        }
    }
    async create (user: IUser){
        try{
            const connection = await database.connect(); 
            const sql = `INSERT INTO users (first_name, last_name, password) VALUES ($1,$2,$3) RETURNING *`;
            const hash = bcrypt.hashSync(user.password + process.env.BCRYPT_PASSWORD, +process.env.SALT_ROUNDS!);
            const result = await database.query(sql,[user.firstName, user.lastName, hash]);
            connection.release();
            return result.rows;
        }
        catch(err) {
            throw new Error(`error while accessing the database: ${err}`);
        }
    }
}
