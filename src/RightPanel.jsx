import React, { useEffect, useState } from 'react';
import { Rect, Image, Stage, Layer } from 'react-konva';
import useImage from 'use-image';
import axios from 'axios';

const stub_boxes = [
  { 'x': 100, 'y': 100, 'w': 50, 'h': 50, 's': 0.5 }
]

const FullImage = (props) => {
  const [img] = useImage(props.imageUrl);
  const [scale, setScale] = useState(1);
  const [x0, setX0] = useState(0);
  const [y0, setY0] = useState(0);
  const [move, setMove] = useState(false);


  function onWheel(e){
    const dy = e.evt.deltaY;
    const new_scale = scale - (dy / 1380);
    if(new_scale>0.1){
      setScale(new_scale);
    }
  }

  function moveAt(pageX, pageY) {
    if (x0 >= 0) { setX0(pageX) }
    if (y0 >= 0) { setY0(pageY) }
    console.log('x0=', x0, 'y0=', y0, 'move: ', move)
  }

  function onMouseMove(evt) {
    console.log('onMouseMove', evt)
    moveAt(evt.pageX, evt.pageY); 
  }

  function onMouseDown({evt}){
    console.log('onMouseDown', evt)
    this.on('mousemove', onMouseMove);
    setMove(true);
    console.log(move)
  }

  function onMouseUp({evt}){
    console.log('onMouseUp', evt)
    this.off('mousemove', onMouseMove)
    setMove(false);
  }
  
  return <Image 
                image={img}
                offsetX={x0}
                offsetY={y0}
                scaleX={scale}
                scaleY={scale}
                onWheel={onWheel}  
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                />;
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
      <Stage width={window.innerWidth * 0.88} height={window.innerHeight}>
        <Layer>
          {imageFile ? (<FullImage imageUrl={URL.createObjectURL(imageFile)} />) : null } 
        </Layer>
        <Layer>
          <BoundingBoxes boxes={boxes} thresh={thresh} /> 
        </Layer>
      </Stage>

      <div className='treshold-container'>
        <button onClick={predictByForm} className='predict-button'>Predict</button>
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