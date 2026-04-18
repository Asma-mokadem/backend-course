import { type Request, type Response } from "express";
import {
  createNewTodo,
  getTodoById,
  getTodos,
  updateTodo,
  patchTodo,
  deleteTodo,
  type TodoInput,
} from "../services/todos.service.js";
import mongoose from "mongoose";


function isValidId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function getAllTodosController(req: Request, res: Response) {
  try {
    const todos = await getTodos();
    if (!todos || todos.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function getTodoByIdController(req: Request, res: Response) {
  try {
    const id  = String (req.params);
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const todo = await getTodoById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function createNewTodoController(req: Request, res: Response) {
  try {
    const body: TodoInput = req.body;
    if (!body || !body.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const todo = await createNewTodo(body);
    res.status(201).json({ message: "Todo created successfully", todo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function updateTodoController(req: Request, res: Response) {
  try {
    const id  = String (req.params);
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const body: TodoInput = req.body;
    const updated = await updateTodo(id, body);
    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo updated successfully", todo: updated });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function patchTodoController(req: Request, res: Response) {
  try {
    const id  = String (req.params);
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const body: Partial<TodoInput> = req.body;
    const patched = await patchTodo(id, body);
    if (!patched) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo patched successfully", todo: patched });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export async function deleteTodoController(req: Request, res: Response) {
  try {
    const id  = String (req.params);
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const deleted = await deleteTodo(id);
    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}