 export interface User{
        id:number,
        firstName: string;
        lastName: string;
        age: number;
        salary: number;
        email: string,
        isMarried: boolean
}

const users:User[] = [
    {
        id:1,
        "firstName": "Ahmed",
        "lastName": "Ben Salah",
        "age": 28,
        "salary": 1800,
        "email": "ahmed.bensalah@gmail.com",
        "isMarried": false
    },
    {
        id:2,
        "firstName": "Yasmine",
        "lastName": "Trabelsi",
        "age": 32,
        "salary": 2500,
        "email": "yasmine.trabelsi@gmail.com",
        "isMarried": true
    },
    {
        id:3,
        "firstName": "Mehdi",
        "lastName": "Gharbi",
        "age": 26,
        "salary": 1500,
        "email": "mehdi.gharbi@gmail.com",
        "isMarried": false
    },
    {
        id:4,
        "firstName": "Amira",
        "lastName": "Jaziri",
        "age": 30,
        "salary": 2200,
        "email": "amira.jaziri@gmail.com",
        "isMarried": true
    },
    {
        id:5,
        "firstName": "Walid",
        "lastName": "Khlifi",
        "age": 35,
        "salary": 3000,
        "email": "walid.khlifi@gmail.com",
        "isMarried": true
    },
    {
        id:6,
        "firstName": "Sarra",
        "lastName": "Mansouri",
        "age": 24,
        "salary": 1200,
        "email": "sarra.mansouri@gmail.com",
        "isMarried": false
    },
    {
        id:7,
        "firstName": "Oussama",
        "lastName": "Ben Amor",
        "age": 29,
        "salary": 2000,
        "email": "oussama.benamor@gmail.com",
        "isMarried": false
    },
    {
        id:9,
        "firstName": "Ines",
        "lastName": "Chaabane",
        "age": 27,
        "salary": 1700,
        "email": "ines.chaabane@gmail.com",
        "isMarried": true
    }
];

export function getUsers():User[]{
    return users;
}
export function getUserById(id: number): User | undefined {
    return users.find(user => user.id === id);
}
export function updateUserSalary(id: number, salary: number): boolean {
    const user = getUserById(id);
    if (!user) {
        return false;
    }
    user.salary = salary;
    return true;
}
export function updateUser(id: number, newUser: User): boolean {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = newUser;
        return true;
    }
    return false;
}
export function updateUserPartial(id:number,updateFields:Partial<User>):User|undefined{
    const index=users.findIndex((user)=>{
        return user.id===id
    })
    if(index===-1){
        return undefined
    }
    users[index]={
        ...users[index],
        ...updateFields
    }as User;
    return users[index]
}
export function addUser(user:User):void{
    users.push(user)
}
export function deleteUserById(id:number):boolean{
    const index :number=users.findIndex((user)=>{
        return user.id===id
    })
    if(index===-1){
        return false
    }
    users.splice(index,1)
    return true
}
