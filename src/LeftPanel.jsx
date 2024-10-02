import { useState } from 'react'

function OpenButton(){
    return (
        <div className="btn-container">
            <label className="pure-button center" htmlFor="image_uploads">Open</label>
            <input 
                type="file"
                id="image_uploads"
                name="image_uploads"
                accept="image/*"
                multiple/>
        </div>
    )
}


function PredictButton(){
  return (
    <div className="btn-container">
      <div className="pure-button center">Predict all</div>
    </div>
  )
}


function ImagePreview(props){
    return (
        <img 
            src={URL.createObjectURL(props.src)}
            width={32}
            height={32}
        />
    )
}


function LeftPanel() {
    const [files, setFiles] = useState([]);

    const renderFileList = () => (
        <ul>
          {[...files].map(f => (
            <li key={f.name}>
              <ImagePreview src={f} />
            </li>
          ))}
        </ul>
      )

    return (
      <div className="pure-u-1-5 left-panel center">
        <PredictButton />

        {renderFileList()}

        <input type="file" 
        accept="image/*" 
        multiple 
        onChange={(e) => setFiles(e.target.files)} />
        
      </div>
    );
  }

export default LeftPanel;