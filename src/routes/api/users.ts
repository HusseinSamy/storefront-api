import express from 'express'
import usersRouter from '../../handlers/users';

const users = express.Router();

usersRouter(users);

export default users;