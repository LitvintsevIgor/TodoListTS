import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}

type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    newTitle: string
    id: string
}

type ChangeTodoListTFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string
}

export type  ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListTFilterActionType

export const todoListReducer = (todoLists: TodoListType[], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [...todoLists, {id: action.todoListId, title: action.title, filter: "all"}]
        case "CHANGE-TODOLIST-TITLE":
            const todoList = todoLists.find(t => t.id === action.id)
            if (todoList) {
                todoList.title = action.newTitle
                return [...todoLists]
            }
            return  todoLists
        case "CHANGE-TODOLIST-FILTER": {
            const todoList = todoLists.find(t => t.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...todoLists]
            }
        }
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id: id}
}

export const AddTodoListAС = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title: title, todoListId: v1()}
}

export const ChangeTodoListTitleAC = (newTitle: string, id: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", newTitle: newTitle, id: id}
}

export const ChangeTodoListTFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListTFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
}