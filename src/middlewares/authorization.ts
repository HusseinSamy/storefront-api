import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authorize = async (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET!);
    req.user = user;
  } catch (err) {
    res.status(401);
    res.send(`Error happended while validating token: ${err}`);
  }
  next();
};

export default authorize;
