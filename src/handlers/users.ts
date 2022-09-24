import { Request, Response, Router } from "express";
import { User, UsersModel } from "../models/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authorize from "../middlewares/authorization";

dotenv.config();
const Users = new UsersModel();

const index = async (
  _req: Request,
  res: Response<User[] | string>
): Promise<Response<User[] | string>> => {
  try {
    const result = await Users.index();
    return res.send(result);
  } catch (err) {
    return res.status(401).send(`Error happened while returning users`);
  }
};

const show = async (
  req: Request,
  res: Response<User | string>
): Promise<Response<User | string>> => {
  try {
    const result = await Users.show(+req.params.id);
    return res.send(result);
  } catch (err) {
    return res
      .status(401)
      .send(`Error happened while returning user with id ${req.params.id}`);
  }
};

const create = async (
  req: Request,
  res: Response<User | string>
): Promise<Response<User | string>> => {
  try {
    if (
      req.body.firstName !== undefined &&
      req.body.lastName !== undefined &&
      req.body.password !== undefined
    ) {
      const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
      };
      const newUser = await Users.create(user);
      const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!);
      return res.cookie("token", token, { httpOnly: true }).send(token);
    } else {
      return res.status(400).send(`Please enter valid body params`);
    }
  } catch (err) {
    return res.send((err as Error).message);
  }
};
const usersRouter = (app: Router) => {
  app.get("/", authorize, index);
  app.get("/:id", authorize, show);
  app.post("/", create);
};
export default usersRouter;
