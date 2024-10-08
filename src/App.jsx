import { useContext, useState } from 'react'
import './App.css'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

function App() {
  const [imageFile, setImageFile] = useState(null);

  return (
    <>
      <div className='pure-g maincontainer'>
        <LeftPanel 
          setImageFile={setImageFile}/>
        <RightPanel 
          imageFile={imageFile} />
      </div>
    </>
  )
}

export default App
