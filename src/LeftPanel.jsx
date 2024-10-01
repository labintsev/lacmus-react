import { useState } from 'react'

function Button(){
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



function ImagePreview(props){
    let src = props.src
    return (
        <image 
            src={src}
            width={16}
            height={16}
        />
    )
}

function LeftPanel() {
    const [files, setFiles] = useState([]);

    const renderFileList = () => (
        <ol>
          {[...files].map((f, i) => (
            <ImagePreview src={f.resolve} />
          ))}
        </ol>
      )

    return (
      <div className="pure-u-1-5 left-panel center">
        
        {renderFileList()}

        <input type="file" 
        accept="image/*" 
        multiple 
        onChange={(e) => setFiles(e.target.files)} />
        
      </div>
    );
  }

export default LeftPanel;