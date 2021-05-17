import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'API'
}

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect( () => {
        const todolistId = "1e59cf72-a685-4a0f-be20-895e541c1a3c"
        tasksAPI.getTasks(todolistId)
            .then( (res) => {
                setState(res.data)
            } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect( () => {
        const todolistId = "1e59cf72-a685-4a0f-be20-895e541c1a3c";
        const title = 'samsung';
        tasksAPI.createTask(todolistId, title)
            .then( (res) => {
                setState(res.data)
            } )

    }, [] )
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)
    const todolistId = "1e59cf72-a685-4a0f-be20-895e541c1a3c";
    const taskId = 'e216b8c2-d28c-427d-9479-60ecd196b5d8';
    const title = "Ivan";
    tasksAPI.updateTask(todolistId, taskId, title)
        .then( (res) => {
            setState(res.data)
        } )

    return <div> {JSON.stringify(state)}</div>
}

export const DelTask = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = "1e59cf72-a685-4a0f-be20-895e541c1a3c";
    const taskId = '60a0ddea-a29a-4774-8c37-8cc485f0af3c';

    tasksAPI.deleteTask(todolistId, taskId)
        .then( (res) => {
            debugger
            setState(res.data)
        } )

    return <div> {JSON.stringify(state)}</div>
}