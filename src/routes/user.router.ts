import { userController } from 'controller';
import express from 'express';
import { Logger } from 'utils';

const userRouter = express.Router();

//basePath: /api/v1/user

//test router.
userRouter.get('/test', (req, res) => Logger.log('this is test to access userRouter.'));

//create user.
userRouter.post(
  '/', 
  userController.createUserValidator(), 
  userController.createUser
);

//get User by Id.
userRouter.get(
  '/:id',
  userController.getUserValidator(),
  userController.getUser
)

//get users
userRouter.get(
  '/',
  userController.getUsersValidator(),
  userController.getUsers
)

export default userRouter;
