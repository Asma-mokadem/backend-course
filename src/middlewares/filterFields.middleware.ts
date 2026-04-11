import { type Request, type Response, type NextFunction } from "express";
import type { User } from "../services/users.service.js";
export const filterFields= ( req: Request,res: Response,next: NextFunction) =>{
    const body: Partial<User> = req.body
    const tabInvalidKeys:string[]=[]
    for(const key in body){
        if(key!=="firstName" && key !== "lastName" && key !== "age" && key !== "salary"){
            tabInvalidKeys.push(key)
        }
    }
    if(tabInvalidKeys.length>0){
        return res.status(400).json({
            message: "Invalid fields in request",
            invalidFields:tabInvalidKeys,
        })
    }
    next()
}