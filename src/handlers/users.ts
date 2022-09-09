import express, { Request, Response, Router } from 'express'
import { IUser, UsersModel } from '../models/users';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import authorize from '../middlewares/authorization';

dotenv.config();
const Users = new UsersModel();

const index = async (_req: Request, res: Response) =>{
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
        const result = await Users.show(+req.params.id);
        res.send(result);
    }
    catch(err){
        throw new Error(`Error happened while returning user with id ${req.params.id}: ${err}`);
    }
}

const create = async (req: Request, res: Response) => {
    
    const user: IUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
}
    try{
        const newUser = await Users.create(user);
        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET!);
        res.cookie("token", token,{httpOnly: true});
        res.send(token);
    }
    catch(err){
        res.send(`Error happened while creating user: ${err}`);
    }
}
const usersRouter = (app: Router) => {
    app.get('/', authorize, index);
    app.get('/:id', authorize, show);
    app.post('/', create);
}
export default usersRouter;
