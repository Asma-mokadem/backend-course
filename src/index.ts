
import express ,{type Application} from 'express'
import usersRouter from './routes/users.routes.js'
import todosRouter from './routes/todos.routers.js'
import dotenv from "dotenv"
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(" DB connection error:", error);
    process.exit(1);
  }
};
dotenv.config()

const app: Application= express()
const PORT=Number(process.env.PORT)||8080

//c'est un middleware "parse" le corps (req.body) de la requete entrante en JSON et la transforme en un objet js pour l'utiliser dans le code
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(usersRouter)
app.use(todosRouter)

await connectDB()

app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`)
})



