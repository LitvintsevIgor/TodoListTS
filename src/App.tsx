import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: TaskType[]
}


function App() {

    //BLL:

    const todoListID_1 = v1();
    const todoListID_2 = v1();
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
        ],
    })


    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks}) // функция запускает перерисовку если данные изменилились, но она не лезет сама вглубь и не сравнивает,
        // мы сначала изменили данные (объект tasks), а потом просто кидаем его копию функции setTasks, чтобы она как бы сказала "о, мне дали"
        // какой-то новый массив, дайка я запущу перерисовку, а если мы передали бы просто {tasks}, без трех точек, то перерисовка бы не запустилась
        // так как setTasks подумал бы, чтобы раз объект тот же, значит нихрена не изменилось
    }
    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }
    function changeTaskStatus(taskD: string, newIsDoneValue: boolean, todoListID: string ) {
        const task = tasks[todoListID].find(t => t.id === taskD)
        // false -> undefined, null, 0, "", NaN
        // true -> {}, []
        if (task) {
            task.isDone = newIsDoneValue
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(taskD: string, newTitle: string, todoListID: string ) {
        const task = tasks[todoListID].find(t => t.id === taskD)
        // false -> undefined, null, 0, "", NaN
        // true -> {}, []
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }
    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string ) {
        const todoList = todoLists.find( t => t.id === todoListID)
        if(todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }

    }
    function changeTodoListTitle(newTitle: string, todoListID: string ) {
        const todoList = todoLists.find( t => t.id === todoListID)
        if(todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }

    }
    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {id: newTodoListID, title: title, filter: "all"}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }


    const todoListComponents = todoLists.map( (tl) => {
        let tasksForTodoList = tasks[tl.id];
        if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
        }
        return <TodoList todoListID={tl.id}
                         title={tl.title}
                         filter={tl.filter}
                         tasks={tasksForTodoList}
                         addTask={addTask}
                         removeTask={removeTask}
                         changeTodoListFilter={changeTodoListFilter}
                         changeTaskStatus={changeTaskStatus}
                         removeTodoList={removeTodoList}
                         changeTaskTitle={changeTaskTitle}
                         changeTodoListTitle={changeTodoListTitle}
        />

    } )

    //UI:
    //CRUD - Create Read Update Delete
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoListComponents}
        </div>
    );
}

export default App;


