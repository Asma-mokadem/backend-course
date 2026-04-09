import { getUser,getUserStat,getUsersByAge,getUserByHisName,getDefault,getAllUser,getUserByHisId,updateSalary,updateUserById,updatePartial,AddUser,deleteUser} from "../controllers/users.controllers.js"
import Router  from 'express'

const router=Router()

router.get('/users/stats', getUserStat)
router.get('/users/filter/:minAge', getUsersByAge)
router.get('/users/name/:name', getUserByHisName)

router.get('/users', getAllUser)        
router.get('/users/sort', getUser) 

router.get('/users/:id', getUserByHisId)

router.patch('/users/:id/salary/:salary', updateSalary)
router.put('/users/:id', updateUserById)
router.patch('/users/:id', updatePartial)
router.post('/users', AddUser)
router.delete('/users/:id', deleteUser)
export default router 