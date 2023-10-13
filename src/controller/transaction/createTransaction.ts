import { ArgumentValidationError } from "errors";
import { Request, Response } from "express";
import { body } from "express-validator"
import httpStatus from "http-status";

import { transactionService, userService } from "service";
import { errorHandlerWrapper } from "utils";

export const createTransactionValidator = () => {
  return [
    body('senderId')
      .notEmpty()
      .withMessage('SenderId id required.'),
      body('recieverId')
        .notEmpty()
        .withMessage('RecieverId is required.'),
      body('amount')
        .notEmpty()
        .withMessage('Amount is required.')
  ]
}

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  senderId: string,
  recieverId: string,
  amount: number
}
type ReqQuery = unknown;

const createTransactionHandler =async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const {
    senderId,
    recieverId,
    amount
  } = req.body;

  if (senderId === recieverId) {
    throw new ArgumentValidationError(
      'Invalid Argument',
      ['SenderId should be different from RecieverId.']
    )
  }

  if (amount < 0) {
    throw new ArgumentValidationError(
      'Invalid Argument',
      ['amount should not be less than 0. ']
    )
  }

  const sender = await userService.getUser(senderId);

  if (!sender) {
    throw new ArgumentValidationError(
      'Invalid Argument.',
      ['Sender is not exist.']
    )
  }

  if (sender.balance < amount) {
    throw new ArgumentValidationError(
      'Invalid Argument.',
      ['sender has not enough balance.']
    )
  }

  const reciever = await userService.getUser(recieverId);

  if (!reciever) {
    throw new ArgumentValidationError(
      'Invalid Argument.',
      ['Reciever is not exist.']
    )
  }

  await userService.updateUser(
    { _id: senderId }, 
    { balance: sender.balance - amount }
  );

  await userService.updateUser(
    { _id: recieverId },
    { balance: reciever.balance + amount }
  );

  const result = await transactionService.createTransaction({
    senderId,
    recieverId,
    amount
  });

  return res.status(httpStatus.OK).json({
    message: 'Success.',
    result
  })
}

export const createTransaction = errorHandlerWrapper(createTransactionHandler);
