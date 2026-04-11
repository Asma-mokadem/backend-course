import {type Request,type Response} from "express"
import {getUserBySalary,filterByAge,userStat,getUserByAge,getUserByName,updateUserPartial,updateUser,getUserById,deleteUserById,getUsers,addUser, type User,type State, updateUserSalary} from '../services/users.service.js'


export function getDefault(req:Request,res:Response){
    res.status(200).json({
      message:"welcome to my new Express Server",
      author:"asma",
      version:"1.0.0"
    })
}

export function getAllUser(req:Request,res:Response){
    const users:User[]=getUsers()
    res.status(200).json(users)
}

export function getUserByHisId(req:Request,res:Response){
    const id=Number(req.params.id)
    if(!id ){
        res.status(400).json({
            message:"Bad Request ",
            error:"id is required "
        })
        return
    }
    if(isNaN(id)){
        res.status(400).json({
            message:"Bad Request ",
            error:"id must be a number "
        })
        return
    }
    const user=getUserById(id)
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404).json({
            mssg:"user not found"
        })
    }
}
export function getUserByHisName(req:Request,res:Response){
    const name=String(req.params.name)
    if(!name){
        res.status(400).json({
            message:"Bad Request ",
            error:"name is required "
        })
        return 
    }
    const user=getUserByName(name)
    if(user){
        res.status(200).json(user)
    }
    else{
        res.status(404).json({
            mssg:"user not found",
            user:"{}"
        })
    }
}
export function getUsersByAge(req: Request, res: Response) {
    const minAge = Number(req.params.minAge)
    if (isNaN(minAge)) {
        return res.status(400).json({
            message: "Bad Request",
            error: "minAge must be a valid number"
        })
    }
    const users = filterByAge(minAge)
    if (users && users.length > 0) {
        return res.status(200).json(users)
    } else {
        return res.status(404).json({
            message: "No users found"
        })
    }
}
export function getUser(req:Request,res:Response){
    const sort=req.query.sort
    if (sort && sort !== "age" && sort !== "salary") {
        return res.status(400).json({
            message: "Bad Request",
            error: "sort must be 'age' or 'salary'",
        })
    }
    const age = Number(req.query.age)
    const salary = Number(req.query.salary)
    if(sort==="age"){
        const user=getUserByAge(age)
        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json(user)
    }else if(sort==="salary"){
        const user=getUserBySalary(salary)
        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json(user)
    }
    else{
        res.status(404).json({
            mssg:"user not found",
            user:"{}"
        })
    }
}

export function updateSalary(req:Request,res:Response){
    const salary = Number(req.params.salary)
    const id = Number(req.params.id)
    if (isNaN(id) || isNaN(salary)) {
        return res.status(400).json({
            message: "Bad Request",
            error: "id or salary is invalid"
        })
    }
    const updated = updateUserSalary(id, salary)
    if (updated) {
        return res.status(200).json({
            message: `User salary with id ${id} updated successfully`
        })
    } else {
        return res.status(404).json({
            message: "User not found"
        })
    }
}
export function updateUserById(req:Request,res:Response){
    const id=Number(req.params.id)
    const newUser:User=req.body
    if(!newUser){
        res.status(400).json({
            message:"Bad Request ",
            error:"request body is missing"
        })
        return
    }
    if(isNaN(id)){
        res.status(400).json({
            message:"Bad Request ",
            error:"id must be a number "
        })
        return
    }
    const updated=updateUser(id,newUser)
    if(updated){
        res.status(200).json({
            message: `User  with id ${id} updated successfully`
        })
    }else{
        return res.status(404).json({
            message: "User not found"
        })
    }
}
export function updatePartial(req:Request,res:Response){
    const id=Number(req.params.id)
    const updateFields=req.body
    if(!updateFields ){
        res.status(400).json({
            message:"Bad Request ",
            error:"request body is missing"
        })
        return
    }
    if( isNaN(id)){
        res.status(400).json({
            message:"Bad Request ",
            error:"id must be a number "
        })
        return
    }
    const updated=updateUserPartial(id,updateFields)
    if(updated){
        res.status(200).json({
            message: `User  with id ${id} updated successfully`
        })
    }else{
        return res.status(404).json({
            message: "User not found"
        })
    }
}
export function AddUser(req:Request,res:Response){
    const newUser:User=req.body
    if(!newUser){
        res.status(400).json({
            message:"Bad Request ",
            error:"request body is missing"
        })
        return
    }
    if(!newUser.firstName || !newUser.email){
        res.status(400).json({
            message:"Bad Request ",
            error:"first name and email are required "
        })
        return
    }
    if(typeof newUser.firstName!=="string"){
        res.status(400).json({
            message:"Bad Request ",
            error:"first must be string "
        })
        return
    }
    if(!newUser.email.includes("@")){
        res.status(400).json({
            message:"Bad Request ",
            error:"invalid email "
        })
        return
    }
    addUser(newUser)
    res.status(201).json({
        message:"user add successfully",
        user:newUser
    })
}
export function deleteUser(req:Request,res:Response){
    const id=Number(req.params.id)
    if(!id ){
        res.status(400).json({
            mssg:"bad request",
            error:"id is required"
        })
        return
    }
    if(isNaN(id)){
        res.status(400).json({
            message:"Bad Request ",
            error:"id must be a number "
        })
        return
    }
    const test=deleteUserById(id)
    if(test==false){
        res.status(404).json({
        mssg:"user not found",
    })
    return
    }
    res.status(201).json({
        mssg:"user deleted",
        user:"user avec l id "+id
    })
}
export function getUserStat(req: Request, res: Response){
    const state:State=userStat()
    res.status(200).json(state)
}

