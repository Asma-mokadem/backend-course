import { UserModel } from "../models/users.model.js";
export interface User{
        firstName: string;
        lastName: string;
        age: number;
        salary: number;
        email: string,
        isMarried: boolean;
        id:number
}

const users:User[] = [
    {
        
        "firstName": "Ahmed",
        "lastName": "Ben Salah",
        "age": 28,
        "salary": 1800,
        "email": "ahmed.bensalah@gmail.com",
        "isMarried": false,
        "id":1

    },
];


export function getUsers():User[]{
    return users;
}
export function getUserById(id: number): User | undefined {
    return users.find(user => user.id === id);
}
export function getUserByName(name:string):User|undefined{
    return users.find(user=>user.firstName===name)
}
export function filterByAge(minAge:number):User[]|undefined{
    return users.filter(user => user.age >= minAge)
}
export function getUserBySalary(salary:number){
    return users.find(user=>user.salary===salary)
}
export function getUserByAge(age:number){
    return users.find(user=>user.age===age)
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
export async function addUser(user: User){
  try {
    const newUser = await UserModel.create(user);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
  }
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
function totalUserNumber():number{
    return users.length
}
function averageAge():number{
    if(users.length===0){
        return 0
    }
    let total:number =0
    for(const user of users){
        total+=user.age
    }
    return total/users.length

}
function totalMariedUsers():number{
    if(users.length===0){
        return 0
    }
    let total:number =0
    for(const user of users){
        if(user.isMarried==true){
            total+=1
        }
    }
    return total
}
export interface State{
    totalUserNumber:number;
    averageAge:number;
    totalMariedUsers:number;
}
export function userStat():State{
    const state:State={
        "totalUserNumber": totalUserNumber(),
        "averageAge": averageAge(),
        "totalMariedUsers":totalMariedUsers()
    }
    return state
}