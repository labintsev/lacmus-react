import { useState } from 'react'

function ImagePreview(props) {

  function onClick() {
    props.setImageFile(props.imgFile)
    console.log(props.imgFile)
  }
  return (
    <img
      src={URL.createObjectURL(props.imgFile)}
      width={32}
      height={32}
      onClick={onClick}
    />
  )
}


function LeftPanel({ setImageFile }) {
  const [imgList, setImgList] = useState([]);

  const renderFileList = () => (
    <div className='image-list'>
      <ul>
        {[...imgList].map(imgFile => (
          <li key={imgFile.name}>
            <ImagePreview
              imgFile={imgFile}
              setImageFile={setImageFile} />
          </li>
        ))}
      </ul>
    </div>

  )

  return (
    <div className="left-panel">

      <input type="file"
        accept="image/*"
        multiple
        onChange={(e) => setImgList(e.target.files)} />
      
      {renderFileList()}
    </div>
  );
}

export default LeftPanel;