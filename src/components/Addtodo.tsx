"use client"
import { useTodos } from '@/store/todos';
import React, { FormEvent, useState } from 'react'

const Addtodo = () => {
    const [todo, setTodo] = useState("")

    const {handleAddTodo} = useTodos(); // this is the context api


    const handleFormSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleAddTodo(todo); // handleAddtodo is a function
        setTodo("")
    }
  return (
    <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Write Your todo" name=" " value={todo} onChange={(event) => setTodo(event.target.value)} />
        <button type="submit"> ADD </button>
    </form>
  )
};

export default Addtodo