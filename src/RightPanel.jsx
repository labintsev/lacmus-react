import React, { useState } from 'react';
import { Rect, Image, Stage, Layer } from 'react-konva';
import useImage from 'use-image';
import axios from 'axios';

const boxes = [
  { 'x': 100, 'y': 100, 'w': 50, 'h': 50, 'p': 0.5 }
]

const FullImage = (props) => {
  const [img] = useImage(props.imageSrc);
  return <Image image={img} />;
};

const BoundingBoxes = (props) => {
  return (
    <>
      {[...boxes]
        .filter((b) => { return b.p > props.thresh })
        .map(
          (b) => (
            <Rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              stroke={"red"} />
          )
        )}
    </>
  )
}

function RightPanel({ imageSrc }) {
  const [thresh, setThresh] = useState(0.5)

  const predictImage = () => {
    console.log(imageSrc)
    const form = new FormData();
    form.append('filename', imageSrc);
    const { data } = axios.post('http://127.0.0.1:8000/tmp', form).then(
      response => { console.log('data', response); }
    )
  }

  const changeThresh = (e) => {
    setThresh(e.target.value / 100)
  }

  return (
    <div className="pure-u-4-5 right-panel">
      <Stage width={6000} height={4000}>
        <Layer>
          <FullImage imageSrc={imageSrc} />
        </Layer>
        <Layer>
          <BoundingBoxes thresh={thresh} />
        </Layer>
      </Stage>

      <div className='treshold-container'>
        <button onClick={predictImage}>Predict</button>
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