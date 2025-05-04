import React, { useEffect, useRef } from 'react'
import todoIcon from '../assets/todo_icon.png'
import ToDoItems from './ToDoItems'
import { useState } from 'react';

const ToDo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : []
  );
  const inputRef = useRef();

  const addTask = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return null;
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    }
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = ""; 
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  }

  const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id)
    })
  }

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList])

  return (
    <div className="flex justify-center items-center w-full px-4 py-6 md:py-10">
      <div className='bg-white w-full max-w-md rounded-xl shadow-md p-4 sm:p-6 mt-4 sm:mt-6 min-h-[60vh] flex flex-col gap-4 transition-all duration-300'>
        <div className='flex items-center mt-2 sm:mt-4 gap-2'>
          <img src={todoIcon} alt="icon-todo" className='w-6 sm:w-8' />
          <h1 className='text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800'>To Do List</h1>
        </div>
        
        <div className='flex rounded-full bg-gray-200 items-center h-10 sm:h-12 gap-2 justify-between mt-2 sm:mt-4'>
          <input 
            type="text" 
            ref={inputRef} 
            placeholder='Add your task' 
            className='bg-transparent pl-4 sm:pl-6 pr-2 w-full outline-none text-sm sm:text-base'
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={addTask} 
            className='rounded-full bg-orange-600 w-20 sm:w-24 md:w-32 h-full text-sm sm:text-base md:text-lg text-white font-medium cursor-pointer hover:bg-orange-700 transition-colors duration-200'
          >
            ADD +
          </button>
        </div>
        
        {/* Empty state */}
        {todoList.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-grow text-gray-500 mt-8">
            <p className="text-center text-sm sm:text-base">No tasks yet. Add a task to get started!</p>
          </div>
        )}
        
        {/* To do items */}
        <div className="flex-grow overflow-y-auto mt-2 sm:mt-4">
          {todoList.map((item, index) => {
            return (
              <ToDoItems 
                key={index} 
                text={item.text} 
                id={item.id} 
                isComplete={item.isComplete} 
                deleteTodo={deleteTodo} 
                toggle={toggle}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ToDo