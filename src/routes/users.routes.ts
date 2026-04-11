import { getUser,getUserStat,getUsersByAge,getUserByHisName,getDefault,getAllUser,getUserByHisId,updateSalary,updateUserById,updatePartial,AddUser,deleteUser} from "../controllers/users.controllers.js"
import Router  from 'express'
import { transformUserMiddleware } from "../middlewares/transformUser.middleware.js"
import { checkUserExists } from "../middlewares/checkUserExists.middleware.js"
import { filterFields } from "../middlewares/filterFields.middleware.js"

const router=Router()

router.get('/users/stats', getUserStat)
router.get('/users/filter/:minAge', getUsersByAge)
router.get('/users/name/:name', getUserByHisName)

router.get('/users', getAllUser)        
router.get('/users/sort', getUser) 

router.get('/users/:id',checkUserExists, getUserByHisId)

router.patch('/users/:id/salary/:salary',checkUserExists, updateSalary)
router.put('/users/:id',filterFields,checkUserExists,transformUserMiddleware, updateUserById)
router.patch('/users/:id',filterFields,checkUserExists,transformUserMiddleware, updatePartial)
router.post('/users',transformUserMiddleware, AddUser)
router.delete('/users/:id',checkUserExists, deleteUser)
export default router 