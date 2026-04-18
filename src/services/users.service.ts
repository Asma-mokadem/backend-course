import { UserModel } from "../models/users.model.js";

export interface User {
  firstName: string;
  lastName: string;
  age: number;
  salary: number;
  email: string;
  isMarried: boolean;
}

export interface State {
  totalUserNumber: number;
  averageAge: number;
  totalMariedUsers: number;
}

export async function getUsers(): Promise<User[]> {
  return await UserModel.find();
}

export async function getUserById(id: string) {
  return await UserModel.findById(id);
}

export async function getUserByName(name: string) {
  return await UserModel.findOne({ firstName: name });
}

export async function filterByAge(minAge: number) {
  return await UserModel.find({ age: { $gte: minAge } });
}

export async function getUserBySalary(salary: number) {
  return await UserModel.findOne({ salary });
}

export async function getUserByAge(age: number) {
  return await UserModel.findOne({ age });
}

export async function updateUserSalary(id: string, salary: number) {
  return await UserModel.findByIdAndUpdate(id, { salary }, { new: true });
}

export async function updateUser(id: string, newUser: User) {
  return await UserModel.findByIdAndUpdate(id, newUser, {
    new: true,
    runValidators: true,
  });
}

export async function updateUserPartial(id: string, updateFields: Partial<User>) {
  return await UserModel.findByIdAndUpdate(id, updateFields, {
    new: true,
    runValidators: true,
  });
}

export async function addUser(user: User) {
  return await UserModel.create(user);
}

export async function deleteUserById(id: string) {
  return await UserModel.findByIdAndDelete(id);
}

export async function userStat(): Promise<State> {
  const users = await UserModel.find();
  const totalUserNumber = users.length;
  const averageAge =
    totalUserNumber === 0
      ? 0
      : users.reduce((sum, u) => sum + (u.age ?? 0), 0) / totalUserNumber;
  const totalMariedUsers = users.filter((u) => u.isMarried === true).length;

  return { totalUserNumber, averageAge, totalMariedUsers };
}