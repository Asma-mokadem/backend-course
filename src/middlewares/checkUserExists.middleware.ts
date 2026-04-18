import { type Request, type Response, type NextFunction } from "express";
import { getUserById } from "../services/users.service.js";
import mongoose from "mongoose";

export const checkUserExists = async (req: Request,res: Response,next: NextFunction) => {
    const  id  = String(req.params);
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
        message: "ID invalide ou manquant",
        });
    }
    const user = await getUserById(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    (req as Request & { user: typeof user }).user = user;
    next();
};