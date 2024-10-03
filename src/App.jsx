import { useContext } from 'react'
import './App.css'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

function App() {
  const Context = useContext([])

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
