import { TodoModel } from "../models/todos.model.js";

export interface TodoInput {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  category?: string;
}

export async function getTodos() {
  return await TodoModel.find();
}

export async function getTodoById(id: string) {
  return await TodoModel.findById(id);
}

export async function createNewTodo(data: TodoInput) {
  return await TodoModel.create(data);
}

export async function updateTodo(id: string, data: TodoInput) {
  return await TodoModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function patchTodo(id: string, data: Partial<TodoInput>) {
  return await TodoModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteTodo(id: string) {
  return await TodoModel.findByIdAndDelete(id);
}