import { useState } from 'react';
import { useRef } from 'react';

function ImagePreview(props) {

  function onClick() {
    props.setImageFile(props.imgFile)
    console.log(props.imgFile)
  }
  return (
    <img
      src={URL.createObjectURL(props.imgFile)}
      onClick={onClick}
    />
  )
}


function LeftPanel({ setImageFile }) {
  const [imgList, setImgList] = useState([]);
  const inputFile = useRef(null)

  const renderFileList = () => (
    <div className='image-list'>

      {[...imgList].map(imgFile => (
        <ImagePreview
          imgFile={imgFile}
          key={imgFile.name}
          setImageFile={setImageFile} />
      ))}

    </div>
  )

  const onButtonClick = () => {
    inputFile.current.click();
  };

  return (
    <div className="left-panel">

      <input type="file"
        id='file'
        ref={inputFile}
        style={{ display: 'none' }}
        accept="image/*"
        multiple
        onChange={(e) => setImgList(e.target.files)} />


        <button onClick={onButtonClick} className='pure-button open-button'>Open files</button>

      {renderFileList()}
    </div>
  );
}

export default LeftPanel;