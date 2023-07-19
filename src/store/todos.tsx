"use client"; 

import { ReactNode, createContext, useContext, useState } from "react";

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task: string) => void; // call signature
    toggleTodoAsCompleted: (id:string) => void; // toggleTodoAsCompleted function defined garako
    handleTodoDelete: (id:string) => void;
}

export const todosContext = createContext<TodosContext | null >(null) // creating the context

export const Todosprovider = ({children}: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>(() => { // <Todo[]> li generic vancha
        const newTodos = localStorage.getItem("todos" ) || "[]";
        return JSON.parse(newTodos) as Todo[]
    }); 

    const handleAddTodo = (task: string) => {
        setTodos((prev) => {
            const newTodos: Todo[] = [
                {
                    id: Math.random().toString(),
                    task, // key ra value same vayo vana auto matrai lakda huncha
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
        localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;
        }
        )
    }

    // if the task is completed 
    const toggleTodoAsCompleted = (id:string) =>{ //  this is All page toggletoddoascompleted
        setTodos((prev) => {
            const newTodos = prev.map((task) => {
                if(task.id == id) {
                    return {...task, completed : ! task.completed}
                }
                return task;
            })
        localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;
        })
    }


    // if the task is deleted
    const handleTodoDelete = (id:string) =>{ // this is a All page handletododelete
        setTodos((prev) => {
            const newTodos = prev.filter((task) => task.id != id)
        localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;
        })
    }


    return (
        <todosContext.Provider value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleTodoDelete }}>
            {children}
        </todosContext.Provider>
    )
}


// context api

export function useTodos() {
    const todosContextValue = useContext(todosContext)
    if(!todosContextValue){
        throw new Error('UseTods used outside of Provider')
    }
    return todosContextValue;
}