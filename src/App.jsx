import { useState } from 'react'
import Navbar from './components/Navbar'
import Display from './components/Display'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div className='no-scrollbar'>
    <Display/>
   </div>
    </>
  )
}

export default App
