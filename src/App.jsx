import { useContext, useState } from 'react'
import './App.css'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

function App() {
  const [imageSrc, setImageSrc] = useState('');

  return (
    <>
      <div className='pure-g maincontainer'>
        <LeftPanel 
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}/>
        <RightPanel 
          imageSrc={imageSrc} />
      </div>
    </>
  )
}

export default App
