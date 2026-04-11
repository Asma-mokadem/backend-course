import { type Request, type Response } from "express"
import {createNewTodo,getTodoById,getTodos,updateTodo,patchTodo,deleteTodo, type Todo} from "../services/todos.service.js"

export function getAllTodosController(req: Request, res: Response) {
    const todos: Todo[] = getTodos()
    if (!todos || todos.length === 0) {
        return res.status(404).json({
            message: "No todos found"
        })
    }
    res.status(200).json(todos)
}
export function getTodoByIdController(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({
            message: "ID must be a number"
        })
    }
    const todo = getTodoById(id)
    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        })
    }
    res.status(200).json(todo)
}

export function createNewTodoController(req: Request, res: Response) {
    const newTodo = req.body
    if (!newTodo) {
        return res.status(400).json({
            message: "Body is required"
        })
    }
    createNewTodo(newTodo)
    res.status(201).json({
        message: "Todo created successfully"
    })
}

export function updateTodoController(req: Request, res: Response) {
    const id = Number(req.params.id)
    const updatedTodo: Todo = req.body
    if (isNaN(id)) {
        return res.status(400).json({
            message: "ID must be a number"
        })
    }
    const existingTodo = getTodoById(id)
    if (!existingTodo) {
        return res.status(404).json({
            message: "Todo not found"
        })
    }
    updateTodo(updatedTodo, id)
    res.status(200).json({
        message: "Todo updated successfully"
    })
}
export function patchTodoController(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updates = req.body;
    if (isNaN(id)) {
        return res.status(400).json({
            message: "ID must be a number"
        });
    }
    const existingTodo = getTodoById(id);
    if (!existingTodo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }
    patchTodo(updates, id);
    res.status(200).json({
        message: "Todo patched successfully"
    });
}
export function deleteTodoController(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            message: "ID must be a number"
        });
    }
    const existingTodo = getTodoById(id);
    if (!existingTodo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }
    deleteTodo(id);
    res.status(200).json({
        message: "Todo deleted successfully"
    });
}