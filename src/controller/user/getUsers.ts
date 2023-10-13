import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "service";
import { errorHandlerWrapper } from "utils";

export const getUsersValidator = () => {
  return [];
}

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQeury = unknown;

const getUsersHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQeury>,
  res: Response
) => {
  const users = await userService.getUsers();

  return res.status(httpStatus.OK).json({
    messsage: 'Success.',
    result: users
  })
}

export const getUsers = errorHandlerWrapper(getUsersHandler);
