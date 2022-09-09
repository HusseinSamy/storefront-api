import express, { Request, Response, Router } from 'express'
import { IUser, UsersModel } from '../models/users';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const Users = new UsersModel();

const index = async (req: Request, res: Response) =>{
     try{
        jwt.verify(req.body.token, process.env.TOKEN_SECRET!);
    }
    catch(err){
        res.status(401);
        throw new Error(`Error happened while verifying the token: ${err}`)
    }
    try{
        const result = await Users.index();
        res.send(result);
    }
    catch(err){
        throw new Error(`Error happened while returning all users: ${err}`);
    }
}

const show = async (req: Request, res: Response) =>{
     try{
        jwt.verify(req.body.token, process.env.TOKEN_SECRET!);
    }
    catch(err){
        res.status(401);
        throw new Error(`Error happened while verifying the token: ${err}`)
    }
    try{
        const result = await Users.show(+req.params.id);
        res.send(result);
    }
    catch(err){
        throw new Error(`Error happened while returning user with id ${req.params.id}: ${err}`);
    }
}

const create = async (req: Request, res: Response) => {
    try{
        const user: IUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }
        
        const newUser = await Users.create(user);
        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET!);
        res.send(token);
    }
    catch(err){
        res.send(`Error happened while creating user: ${err}`);
    }
}
const usersRouter = (app: Router) => {
    app.get('/', index);
    app.get('/:id', show);
    app.post('/', create);
}
export default usersRouter;
