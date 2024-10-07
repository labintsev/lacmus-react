import React, { useEffect, useRef } from 'react'; 
import { Rect, Image, Stage, Layer } from 'react-konva';
import useImage from 'use-image';

const boxes = [
  {'x': 100, 'y': 100, 'w': 50, 'h': 50}
]

const FullImage = (props) => {
  const [img] = useImage(props.imageSrc);
  return <Image image={img} />;
};

const BoundingBoxes = (props) => {
  return (
    <>
      { boxes.map((b) => ( 
        <Rect 
          x={b.x} 
          y={b.y}
          width={b.w}
          height={b.h}
          stroke={"red"}
          />)
      )}
    </>
  )
}

function TresholdComponent(){
    return (
        <div className='treshold-container'>
        <label>
        Treshold:
        <input
            className="pure-form" 
            type="range"
            min="1"
            max="99"
            width="600"/>
        </label>
        </div>
    )
}

function RightPanel({imageSrc}) {
    return (
      <div className="pure-u-4-5 right-panel">
        <Stage width={6000} height={4000}>
        <Layer>
          <FullImage imageSrc={imageSrc}/>
        </Layer>
        <Layer>
          <BoundingBoxes />
        </Layer>
      </Stage>
        <TresholdComponent/>
      </div>
    );
  }

  export default RightPanel;