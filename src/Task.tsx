import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./AppWithRedux";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";


export type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (taskD: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskD: string, newTitle: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    todoListID: string
}


export const Task = React.memo((props: TaskPropsType) => {
    console.log("Task called")

    const removeTask = useCallback (() => {
        props.removeTask(props.task.id, props.todoListID)
    }, [props.removeTask, props.task.id, props.todoListID])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID)
    }, [props.changeTaskStatus, props.task.id, props.todoListID])

    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todoListID)
    }, [props.changeTaskTitle, props.task.id, props.todoListID])

    return (
        <li className={props.task.isDone ? "is-done" : ""}>
            <Checkbox checked={props.task.isDone}
                      onChange={changeTaskStatus}
                      color={"secondary"}
            />
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})