import { getUsers, addUser } from './data/users.js';
import express, {} from 'express';
const app = express();
const PORT = 3000;
const users = getUsers();
//c'est un middleware "parse" le corps (req.body) de la requete entrante en JSON et la transforme en un objet js pour l'utiliser dans le code
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.status(200).json({
        message: "welcome to my new Express Server",
        author: "asma",
        version: "1.0.0"
    });
});
app.get('/users', (req, res) => {
    res.status(200).json(users);
});
app.post('/users', (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    addUser(newUser);
    res.status(201).json({
        message: "user add successfully",
        user: newUser
    });
});
app.listen(3000, () => {
    console.log(`Server is runnig on port ${PORT}`);
});
//# sourceMappingURL=index.js.map