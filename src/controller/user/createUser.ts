import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { body } from 'express-validator'

import { userService } from 'service';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';

export const createUserValidator = () => {
  return [
    body('balance')
      .notEmpty()
      .withMessage('Balance is required'),
  ];
}

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  balance: number
};
type ReqQeury = unknown;

const createUserHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQeury>,
  res: Response
) => {
  const { balance } = req.body;
  const result = await userService.createUser(balance);

  res.status(httpStatus.OK).json({
    message: 'Suceess!',
    result: result
  })
}

export const createUser = errorHandlerWrapper(createUserHandler);
