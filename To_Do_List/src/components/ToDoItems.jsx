import React from 'react'
import tickIcon from '../assets/tick.png'
import deleteIcon from '../assets/delete.png'
import nottickIcon from '../assets/not_tick.png'
const ToDoItems = ({text ,id , isComplete ,deleteTodo, toggle}) => {
  return (
    <div className='flex items-center  my-3 gap-2'>
        <div className='flex items-center gap-2 flex-1 cursor-pointer' onClick={()=>{toggle(id)}}>
            <img src={isComplete?tickIcon : nottickIcon} alt="tick" className='w-6' />
            <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-950 ${isComplete? "line-through":""}`}>{text}</p>

        </div>
        <img onClick={()=> {deleteTodo(id)}} src={deleteIcon} alt="delete-icon" className='w-3.5 cursor-pointer items-center ' />
      
    </div>
  )
}

export default ToDoItems
