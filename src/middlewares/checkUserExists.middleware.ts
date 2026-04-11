import { type Request, type Response, type NextFunction } from "express";
import { getUserById } from "../services/users.service.js";
export const checkUserExists= ( req: Request,res: Response,next: NextFunction) =>{
    const id=Number(req.params.id)
    if(!id || isNaN(id)){
        res.status(400).json({
            message:"request invalid",
            error:"Id must be a number or you must enter an ID"
        })
    }
    const user=getUserById(id)
    if(user===undefined){
        return res.status(404).json({ message: "user not found" })
    }
    (req as any).user=user
    next()
}