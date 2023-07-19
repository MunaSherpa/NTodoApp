"use client"

import { useTodos } from "@/store/todos"
import { useSearchParams } from 'next/navigation'




const Todos = () => {

    const {todos, toggleTodoAsCompleted, handleTodoDelete} = useTodos()
    const searchParams = useSearchParams();
   const todosFilter = searchParams.get('todos')

    console.log(todos)

    let filteTodos = todos;

    if(todosFilter === "active"){
        filteTodos = filteTodos.filter((todo) => !todo.completed) // if the todo is not complete then show in active
    }else if(todosFilter === "completed"){
        filteTodos = filteTodos.filter((todo) => todo.completed) // if the todo is  complete then show in completed

    }

  return (
    <ul>
        {
            filteTodos.map((todo) => {
                return <li key={todo.id}>
                    
                    <input type="checkbox" name="" id={`todo-${todo.id}`} checked={todo.completed}  onChange={() => toggleTodoAsCompleted(todo.id)}/>

                    <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>

                    {
                        todo.completed && (
                            <button type="button" onClick={() => handleTodoDelete(todo.id)}>Delete</button>
                        )
                    }
                
                </li>
            })
        }
    </ul>
  )
}

export default Todos