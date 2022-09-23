import { Request, Response, Router } from "express";
import { User, UsersModel } from "../models/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authorize from "../middlewares/authorization";

dotenv.config();
const Users = new UsersModel();

const index = async (_req: Request, res: Response): Promise<User[]> => {
  try {
    const result = await Users.index();
    res.send(result);
    return result;
  } catch (err) {
    res.status(401);
    res.send(`Error happened while returning user with id: ${err}`);
    throw new Error(`Error happened while returning all users: ${err}`);
  }
};

const show = async (req: Request, res: Response): Promise<User> => {
  try {
    const result = await Users.show(+req.params.id);
    res.send(result);
    return result;
  } catch (err) {
    res.status(401);
    res.send(
      `Error happened while returning user with id ${req.params.id}: ${err}`
    );
    throw new Error(
      `Error happened while returning user with id ${req.params.id}: ${err}`
    );
  }
};

const create = async (req: Request, res: Response): Promise<User | null> => {
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
      res.cookie("token", token, { httpOnly: true });
      res.send(token);
      return newUser;
    } else {
      res.status(400);
      throw new Error(`Please enter valid body params`);
    }
  } catch (err) {
    res.send((err as Error).message);
    return null;
  }
};
const usersRouter = (app: Router) => {
  app.get("/", authorize, index);
  app.get("/:id", authorize, show);
  app.post("/", create);
};
export default usersRouter;
