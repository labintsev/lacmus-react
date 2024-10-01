import { useState } from 'react'
import './App.css'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='pure-g maincontainer'>
        <LeftPanel/>
        <RightPanel/>
      </div>
    </>
  )
}

export default App
