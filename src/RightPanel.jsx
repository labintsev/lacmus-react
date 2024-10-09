import React, { useState } from 'react';
import { Rect, Image, Stage, Layer } from 'react-konva';
import useImage from 'use-image';
import axios from 'axios';

const stub_boxes = [
  { 'x': 100, 'y': 100, 'w': 50, 'h': 50, 's': 0.5 }
]

const FullImage = (props) => {
  const [img] = useImage(props.imageUrl);
  return <Image image={img} />;
};

const BoundingBoxes = ({boxes, thresh}) => {
  return (
    <>
      {[...boxes]
        .filter((b) => { return b.s > thresh })
        .map(
          (b) => (
            <Rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              stroke={"red"} 
              key={b.s}/>
          )
        )}
    </>
  )
}

function RightPanel({ imageFile }) {
  const [thresh, setThresh] = useState(0.5);
  const [boxes, setBoxes] = useState([]);

  const predictByForm = () => {
    const endpoint = `http://127.0.0.1:5000/`
    const form = new FormData();
    form.append('image_file', imageFile)
    const { promise } = axios.post(endpoint, form).then(
      response => { 
        console.log('data', response); 
        setBoxes(response['data']);
      }
    )
  }

  const changeThresh = (e) => {
    setThresh(e.target.value / 100)
  }

  return (
    <div className="pure-u-4-5 right-panel">
      <Stage width={6000} height={4000}>
        <Layer>
          {imageFile ? (<FullImage imageUrl={URL.createObjectURL(imageFile)} />) : null } 
        </Layer>
        <Layer>
          <BoundingBoxes boxes={boxes} thresh={thresh} /> 
        </Layer>
      </Stage>

      <div className='treshold-container'>
        <button onClick={predictByForm}>Predict</button>
        <label>
          <input
            className="pure-form"
            type="range"
            min="1"
            max="99"
            width="600"
            onChange={changeThresh} />
        </label>
      </div>
    </div>
  );
}

export default RightPanel;