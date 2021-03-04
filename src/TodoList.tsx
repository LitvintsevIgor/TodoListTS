import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";


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
}

function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        const trimmedTitle = title.trim() // обрезает пробелы с начала и с конца строки
        if(trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListID)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    };

    const setAllFilter = () => {
        props.changeTodoListFilter("all", props.todoListID)
    }
    const setAсtiveFilter = () => {
        props.changeTodoListFilter("active", props.todoListID)
    }
    const setCompletedFilter = () => {
        props.changeTodoListFilter("completed", props.todoListID)
    }

    const removeTodoList = ()=> {
        props.removeTodoList(props.todoListID)
    }

    const tasks = props.tasks.map((t) => {

        const removeTask = () => {
            props.removeTask(t.id, props.todoListID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)

        return (
            <li className={t.isDone ? "is-done" : ""} >
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeTaskStatus}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X
                </button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodoList}>X</button> </h3>
            <div>
                <input
                    className={ error ? "error" : ""}
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button
                    onClick={addTask}
                >ADD
                </button>
                {error && <div className={"error-message"}>Title is required!</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={ props.filter === "all" ? "active" : "" } onClick={setAllFilter}>All</button>
                <button className={ props.filter === "active" ? "active" : "" } onClick={setAсtiveFilter}>Active</button>
                <button className={ props.filter === "completed" ? "active" : "" } onClick={setCompletedFilter}>Completed</button>
            </div>
        </div>
    )

}

export default TodoList;