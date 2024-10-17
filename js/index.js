import { signIn } from "./sign.js"

import { createTodoList } from "./todoList.js";
import { createTodo } from "./todo.js";

const username = "toto";
const password = "rootroot";

async function run() {
    let token = '';
    await signIn(username, password)
        .then(t => { token = t })
        .catch(console.error)

    const title = "liste pour toto";
    let todoListId = '';
    await createTodoList(username, title, token)
        .then(todoList => { todoListId = todoList.id })
        .catch(console.error)


    const content = "todo item 1";
    let todoId = '';
    await createTodo(content, todoListId, token)
        .then(todo => {todoId = todo.id})
        .catch(console.error)

    console.log("token", token)
    console.log("todoListId", todoListId)
    console.log("todoId", todoId)
}

run()