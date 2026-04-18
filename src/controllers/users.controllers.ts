import { type Request, type Response } from "express";
import {
  getUserBySalary,
  updateUserSalary,
  filterByAge,
  userStat,
  getUserByAge,
  getUserByName,
  updateUserPartial,
  updateUser,
  getUserById,
  deleteUserById,
  getUsers,
  addUser,
  type User,
} from "../services/users.service.js";
import mongoose from "mongoose";

function isValidId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export function getDefault(req: Request, res: Response) {
  res.status(200).json({
    message: "welcome to my new Express Server",
    author: "asma",
    version: "1.0.0",
  });
}

export async function getAllUser(req: Request, res: Response) {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function getUserByHisId(req: Request, res: Response) {
  try {
    const id = String(req.params);
    if (!isValidId(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function getUserByHisName(req: Request, res: Response) {
  try {
    const  name  = String(req.params);
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const user = await getUserByName(name);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function getUsersByAge(req: Request, res: Response) {
  try {
    const minAge = Number(req.params.minAge);
    if (isNaN(minAge)) {
      return res.status(400).json({ message: "minAge must be a valid number" });
    }
    const users = await filterByAge(minAge);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const sort = req.query.sort;
    if (sort && sort !== "age" && sort !== "salary") {
      return res.status(400).json({ message: "sort must be 'age' or 'salary'" });
    }
    const age = Number(req.query.age);
    const salary = Number(req.query.salary);

    if (sort === "age") {
      const user = await getUserByAge(age);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json(user);
    } else if (sort === "salary") {
      const user = await getUserBySalary(salary);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json(user);
    }
    res.status(400).json({ message: "sort parameter is required" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function updateSalary(req: Request, res: Response) {
  try {
    const  id   = String(req.params);
    const  salary   = Number(req.params);
    if (!isValidId(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }
    const salaryNum = Number(salary);
    if (isNaN(salaryNum)) {
      return res.status(400).json({ message: "salary must be a number" });
    }
    const updated = await updateUserSalary(id, salaryNum);
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `Salary updated for user ${id}` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function updateUserById(req: Request, res: Response) {
  try {
    const  id   = String(req.params);
    if (!isValidId(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }
    const newUser: User = req.body as User;
    if (!newUser) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    const updated = await updateUser(id, newUser);
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `User ${id} updated successfully` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function updatePartial(req: Request, res: Response) {
  try {
    const  id   = String(req.params);
    if (!isValidId(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }
    const updateFields = req.body as Partial<User>;
    if (!updateFields) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    const updated = await updateUserPartial(id, updateFields);
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `User ${id} patched successfully` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function AddUser(req: Request, res: Response) {
  try {
    const newUser: User = req.body as User;
    if (!newUser) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    if (!newUser.firstName || !newUser.email) {
      return res.status(400).json({ message: "firstName and email are required" });
    }
    if (!newUser.email.includes("@")) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const created = await addUser(newUser);
    res.status(201).json({ message: "User created successfully", user: created });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const  id   = String(req.params);
    if (!isValidId(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }
    const deleted = await deleteUserById(id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `User ${id} deleted` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function getUserStat(req: Request, res: Response) {
  try {
    const state = await userStat();
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}