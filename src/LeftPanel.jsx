import { useState } from 'react'

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

  const renderFileList = () => (
    <div className='image-list'>

        {[...imgList].map(imgFile => (
            <ImagePreview
              imgFile={imgFile}
              setImageFile={setImageFile} />
        ))}

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