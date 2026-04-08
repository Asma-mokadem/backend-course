import {Router,type Request,type Response} from "express"
import { updateUserPartial,updateUser,getUserById,deleteUserById,getUsers,addUser, type User, updateUserSalary} from '../data/users.service.js'


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

export function getUserByid(req:Request,res:Response){
    const id=Number(req.params.id)
    if(!id){
        res.status(400).json({
            message:"Bad Request ",
            error:"id is required "
        })
    }
    const user=getUserById(id)
    if(user){
        res.status(201).json(user)
    }else{
        res.status(404).json({
            mssg:"user not found"
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
        });
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
        return;
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
    if(!updateFields){
        res.status(400).json({
            message:"Bad Request ",
            error:"request body is missing"
        })
        return;
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
        return;
    }
    if(!newUser.firstName || !newUser.email){
        res.status(400).json({
            message:"Bad Request ",
            error:"first name and email are required "
        })
        return;
    }
    addUser(newUser)
    res.status(201).json({
        message:"user add successfully",
        user:newUser
    })
}
export function deleteUser(req:Request,res:Response){
    const id=Number(req.params.id)
    if(!id){
        res.status(400).json({
            mssg:"bad request",
            error:"id is required"
        })
        return;
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

