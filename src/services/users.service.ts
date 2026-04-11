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
        id:1
    },
    {
        "firstName": "Yasmine",
        "lastName": "Trabelsi",
        "age": 32,
        "salary": 2500,
        "email": "yasmine.trabelsi@gmail.com",
        "isMarried": true,
        id:2
    },
    {
        "firstName": "Mehdi",
        "lastName": "Gharbi",
        "age": 26,
        "salary": 1500,
        "email": "mehdi.gharbi@gmail.com",
        "isMarried": false,
        id:3
    },
    {
        "firstName": "Amira",
        "lastName": "Jaziri",
        "age": 30,
        "salary": 2200,
        "email": "amira.jaziri@gmail.com",
        "isMarried": true,
          id:4,
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
        "firstName": "Sarra",
        "lastName": "Mansouri",
        "age": 24,
        "salary": 1200,
        "email": "sarra.mansouri@gmail.com",
        "isMarried": false,
        id:6
    },
];
function generateId(): number {
    if (users.length === 0) return 1
    return Math.max(...users.map(u => u.id)) + 1  
}

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
export function addUser(user:User):void{
    const newUser:User={
        ...user,
        id:generateId()
    }
    users.push(newUser)
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