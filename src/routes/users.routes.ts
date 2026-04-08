import { getDefault,getAllUser,getUserByid,updateSalary,updateUserById,updatePartial,AddUser,deleteUser} from "../controllers/users.controllers.js"
import Router  from 'express'

const router=Router()

router.get('/',getDefault)
router.get('/users',getAllUser)
router.get('/users/:id',getUserByid)
router.patch('/users/:id/:salary', updateSalary)
router.put('/users/:id',updateUserById)
router.patch('/users/:id',updatePartial)
router.post('/users',AddUser)
router.delete('/users/:id',deleteUser)

export default router 