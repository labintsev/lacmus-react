import { useState } from 'react'

function ImagePreview(props) {

  function onClick() {
    props.setImageSrc(URL.createObjectURL(props.src))
  }
  return (
    <img
      src={URL.createObjectURL(props.src)}
      width={32}
      height={32}
      onClick={onClick}
    />
  )
}


function LeftPanel({ setImageSrc }) {
  const [files, setFiles] = useState([]);

  const renderFileList = () => (
    <div className='image-list'>
      <ul>
        {[...files].map(f => (
          <li key={f.name}>
            <ImagePreview
              src={f}
              setImageSrc={setImageSrc} />
          </li>
        ))}
      </ul>
    </div>

  )

  return (
    <div className="left-panel">

      {renderFileList()}

      <input type="file"
        accept="image/*"
        multiple
        onChange={(e) => setFiles(e.target.files)} />

    </div>
  );
}

export default LeftPanel;