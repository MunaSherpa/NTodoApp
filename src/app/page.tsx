
import Addtodo from '@/components/Addtodo'
import Todos from '@/components/Todos'
import Navbar from '@/components/navbar'
import "./globals.css"
import {RiTodoLine} from "react-icons/ri";

const page = () => {
  return (
    <main>
      <h2> <RiTodoLine className='icons'/> ToDo App <RiTodoLine className='icons'/></h2>
      <Navbar />
      <Addtodo />
      <Todos />
    </main>
  )
}

export default page