const users = [
    {
        "firstName": "Ahmed",
        "lastName": "Ben Salah",
        "age": 28,
        "salary": 1800,
        "email": "ahmed.bensalah@gmail.com",
        "isMarried": false
    },
    {
        "firstName": "Yasmine",
        "lastName": "Trabelsi",
        "age": 32,
        "salary": 2500,
        "email": "yasmine.trabelsi@gmail.com",
        "isMarried": true
    },
    {
        "firstName": "Mehdi",
        "lastName": "Gharbi",
        "age": 26,
        "salary": 1500,
        "email": "mehdi.gharbi@gmail.com",
        "isMarried": false
    },
    {
        "firstName": "Amira",
        "lastName": "Jaziri",
        "age": 30,
        "salary": 2200,
        "email": "amira.jaziri@gmail.com",
        "isMarried": true
    },
    {
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
        "isMarried": false
    },
    {
        "firstName": "Oussama",
        "lastName": "Ben Amor",
        "age": 29,
        "salary": 2000,
        "email": "oussama.benamor@gmail.com",
        "isMarried": false
    },
    {
        "firstName": "Ines",
        "lastName": "Chaabane",
        "age": 27,
        "salary": 1700,
        "email": "ines.chaabane@gmail.com",
        "isMarried": true
    }
];
export function getUsers() {
    return users;
}
export function addUser(user) {
    users.push(user);
}
//# sourceMappingURL=users.js.map