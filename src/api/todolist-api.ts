import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '77376ca6-8140-4501-a63e-0618cf645ecb'
    }
})


type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: T
}


export const todoListsAPI = {

    getTodoLists () {
        return instance.get<Array<TodoType>>( "todo-lists")
    },

    createTodoList (title: string) {
        return instance.post<CommonResponseType<{item: TodoType}>>("todo-lists", {title})
    },

    deleteTodoList (todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },

    updateTodoListTitle (todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    }
}



