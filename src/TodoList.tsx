import React, {useState, KeyboardEvent, ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from "./AppWithRedux";
import {log} from "util";


type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskD: string, newIsDoneValue: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskD: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {
    console.log("Todolist called")

    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [])

    const setAllFilter = useCallback(() => {
        props.changeTodoListFilter("all", props.todoListID)
    }, [])
    const setAсtiveFilter = useCallback(() => {
        props.changeTodoListFilter("active", props.todoListID)
    }, [])
    const setCompletedFilter = useCallback(() => {
        props.changeTodoListFilter("completed", props.todoListID)
    }, [])


    const removeTodoList = () => {
        props.removeTodoList(props.todoListID)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }


    let allTodoListTasks = props.tasks;
    let tasksForTodoList = allTodoListTasks;
    if (props.filter === "active") {
        tasksForTodoList = allTodoListTasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodoList = allTodoListTasks.filter(t => t.isDone === true)
    }

    const tasks = tasksForTodoList.map((t) => {

        const removeTask = () => {
            props.removeTask(t.id, props.todoListID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)

        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.todoListID)
        }

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox checked={t.isDone}
                          onChange={changeTaskStatus}
                          color={"secondary"}
                />
                {/*<input type="checkbox"*/}
                {/*       checked={t.isDone}*/}
                {/*       onChange={changeTaskStatus}/>*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: "0"}}>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={setAllFilter}>All
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={setAсtiveFilter}>Active
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    size={"small"}
                    onClick={setCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
})

// export default TodoList;