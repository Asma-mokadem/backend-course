

export interface Todo{
    id:number;
    title:string;
    category:string;
    status:string;
    description:string
}
const todos:Todo[]=[
    {
        id: 1,
        title: "Faire les courses",
        category: "Personnel",
        status: "en cours",
        description: "Acheter du lait, du pain et des fruits"
    },
    {
        id: 2,
        title: "Terminer le projet React",
        category: "Travail",
        status: "en attente",
        description: "Finaliser les composants et tester l'application"
    },
    {
        id: 3,
        title: "Réviser les bases de données",
        category: "Études",
        status: "terminé",
        description: "Réviser les jointures et les requêtes SQL"
    },
    {
        id: 4,
        title: "Faire du sport",
        category: "Santé",
        status: "en cours",
        description: "30 minutes de course à pied"
    },
    {
        id: 5,
        title: "Lire un livre",
        category: "Loisir",
        status: "en attente",
        description: "Lire 20 pages d’un roman"
    }
]
function generateId(): number {
    return todos.length > 0
        ? Math.max(...todos.map(todo => todo.id)) + 1
        : 1;
}
export function getTodos():Todo[]{
    return todos
}
export function getTodoById(id:number):Todo|undefined{
    return todos.find(todo=>todo.id===id)
}
export function createNewTodo(newTodo: Omit<Todo, "id">): void {
    const todo: Todo = {
        ...newTodo,
        id: generateId()
    };
    todos.push(todo);
}
export function updateTodo(updatedTodo: Todo, id: number): void {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
        todos[index] = { ...updatedTodo, id };
    }
}
export function patchTodo(updateFields:Partial<Todo>,id:number):Todo|undefined{
    const index=todos.findIndex((todo)=>{
        return todo.id===id
    })
    if(index===-1){
        return undefined
    }
    todos[index]={
        ...todos[index],
        ...updateFields
    }as Todo;
    return todos[index]
}
export function deleteTodo(id: number): void {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
        todos.splice(index, 1);
    }
}