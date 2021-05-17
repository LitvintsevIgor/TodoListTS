import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '77376ca6-8140-4501-a63e-0618cf645ecb'
    }
})

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksType = {
    error: string
    totalCount: number
    items: Array<TaskType>
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export const tasksAPI = {

    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<CommonResponseType<{item: TaskType}>>(`${todolistId}/tasks`, {title})
    },

    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<CommonResponseType<{item: TaskType}>>(`${todolistId}/tasks/${taskId}`, {title})
    },

    deleteTask (todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`${todolistId}/tasks/${taskId}`)
    }

}