import {getUsers,addUser, type User} from './services/users.service.js'
import express ,{type Application,type Request,type Response} from 'express'
import usersRouter from './routes/users.routes.js'
import todosRouter from './routes/todos.routers.js'
const app: Application= express()
const PORT:number=3000

//c'est un middleware "parse" le corps (req.body) de la requete entrante en JSON et la transforme en un objet js pour l'utiliser dans le code
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(usersRouter)
app.use(todosRouter)



app.listen(3000, () => {
  console.log(`Server is runnig on port ${PORT}`)
})



