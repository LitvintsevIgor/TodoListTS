import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";


export type TaskType = {
    title: string
    id: number
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    //BLL:
    let [tasks, setTasks] = useState <Array<TaskType>> ([
        {id: 1, title: "JS", isDone: false},
        {id: 2, title: "HTML", isDone: true},
        {id: 3, title: "CSS", isDone: false},
    ])

    function removeTask(taskID: number ) {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks) // функция устанавливает обновление переменной tasks
        console.log(tasks)
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
            <TodoList title={"What to learn"} tasks={taskForTodoList} removeTask={removeTask} changeTodoListFilter={changeTodoListFilter}/>
        </div>
    );
}

export default App;


