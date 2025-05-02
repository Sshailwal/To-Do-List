import React, { useEffect, useRef } from 'react'
import todoIcon from '../assets/todo_icon.png'
import ToDoItems from './ToDoItems'
import { useState } from 'react';
const ToDo = () => {

    const [todoList , setTodoList ] = useState(localStorage.getItem("todoList")? JSON.parse(localStorage.getItem("todoList")) : []);

   const inputRef=useRef();
   const addTask=()=>{ 
    const inputText = inputRef.current.value.trim();
    if (inputText==="")return null;
    const newTodo={
        id: Date.now(),
        text:inputText,
        isComplete :false,
    }
    setTodoList((prev)=>[...prev , newTodo ]);
   }
   const deleteTodo =(id)=>{
    setTodoList((prvTodos)=>{
        return prvTodos.filter ((todo)=> todo.id !== id)
    })
   }
   const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete}; 
        }
        return todo;
      });
    });
  };
  useEffect(()=>{
    localStorage.setItem("todoList" , JSON.stringify(todoList)); 
  },[todoList])
    return (
    <div className=' bg-white place-self-center w-11/12 max-w-md rounded-xl shadow-md p-4 mt-10 min-h-[55vh] flex flex-col gap-4'>
     <div className='flex items-center mt-7 gap -2'>
        <img src={todoIcon} alt="icon-todo" className='w-8' />
        <h1 className='text-3xl font-semibold text-gray-800 ' >To Do List</h1>
     </div>
     <div className='flex rounded-full bg-gray-200 items-center h-12  gap-2 justify-between'>
        <input type="text" ref={inputRef} placeholder='Add your task' className='bg-transparent  pl-6 pr-2  '/>
        <button onClick={addTask} className='rounded-full bg-orange-600 w-32 h-full text-lg text-white font-medium cursor-pointer'>ADD +</button>

     </div>
     {/* to do items */}
     <div>
        {todoList.map((item , index )=>{
            return <ToDoItems key={index} text = {item.text} id ={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
        })}
     </div>
    </div>
  )
}

export default ToDo
