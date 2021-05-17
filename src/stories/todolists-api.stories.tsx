import React, {useEffect, useState} from 'react'
import {todoListsAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.getTodoLists()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "Test"
        todoListsAPI.createTodoList(title)
            .then( (res) => {
            setState(res.data)
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '61249e3e-3e91-4f30-90fe-1414fd7e764e';
        todoListsAPI.deleteTodoList(todolistId)
            .then( (res) => {
                setState(res.data)
            } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1e59cf72-a685-4a0f-be20-895e541c1a3c';
        const title = "Angular"
        todoListsAPI.updateTodoListTitle(todolistId, title)
            .then( (res) => {
                debugger
                setState(res.data)
            } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
