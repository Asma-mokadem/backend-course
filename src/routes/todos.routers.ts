import Router  from 'express'
import { deleteTodoController,patchTodoController,updateTodoController,getAllTodosController,getTodoByIdController,createNewTodoController } from '../controllers/todos.controller.js'

const router=Router()
router.get('/todos',getAllTodosController)
router.get('/todos/:id',getTodoByIdController)
router.post('/todos',createNewTodoController)
router.put('/todos/:id',updateTodoController)
router.patch('/todos/:id',patchTodoController)
router.delete('/todos/:id',deleteTodoController)

export default router