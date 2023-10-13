import { User } from "models"

export const createUser =async (data: number) => {
  const user = new User({
    balance: data
  });
  const result = await user.save();
  
  return result;
}

export const getUser =async (id: string) => {
  const user = await User.findById(id, {
    _id: true,
    balance: true
  });

  return user;
}

export const getUsers =async () => {
  const users = await User.find({}, {
    _id: true,
    balance: true
  });

  return users;
}

type filterType = {
  _id: string
}

type updateDataType = {
  balance: number
}

export const updateUser =async (filter:filterType, data: updateDataType) => {
  const user = await User.updateOne(filter, data);
  return user;
}
