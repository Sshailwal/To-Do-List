import { useState } from 'react'
import ToDo from './components/ToDo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-stone-900 grid min-h-screen  '>
    <ToDo/>
    </div>
    
    </>
  )
}

export default App
