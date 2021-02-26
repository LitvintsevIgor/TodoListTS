import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    console.log(v1());
    //BLL:
    let [tasks, setTasks] = useState <Array<TaskType>> ([
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
    ])

    function removeTask(taskID: string ) {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks) // функция устанавливает обновление переменной tasks
        console.log(tasks)
    }
    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    function changeTaskStatus(taskD: string, newIsDoneValue: boolean) {
        const task = tasks.find(t => t.id === taskD)
        // false -> undefined, null, 0, "", NaN
        // true -> {}, []
        if (task) {
            task.isDone = newIsDoneValue
            setTasks([...tasks])
        }
    }

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function changeTodoListFilter(newFilterValue: FilterValuesType) {
        setFilter(newFilterValue)
    }

    let taskForTodoList = tasks;
    if (filter === "active") {
        taskForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        taskForTodoList = tasks.filter(t => t.isDone === true)
    }

    //UI:
    //CRUD - Create Read Update Delete
    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      filter={filter}
                      tasks={taskForTodoList}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
                      changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;


