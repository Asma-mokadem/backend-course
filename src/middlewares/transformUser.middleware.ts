import { type Request, type Response, type NextFunction } from "express";
export const transformUserMiddleware = ( req: Request,res: Response,next: NextFunction) =>{
    if(req.body){
        if(req.body.firstName){
            req.body.firstName = req.body.firstName.trim().toUpperCase()
        }
        if(req.body.email){
             req.body.email = req.body.email.trim().toLowerCase()
        }
    }
    next()
}