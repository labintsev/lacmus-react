import React, { useEffect, useRef } from 'react'; 
import { Image, Stage, Layer } from 'react-konva';
import useImage from 'use-image';


const FullImage = (props) => {
  const [img] = useImage(props.imageSrc);
  return <Image image={img} />;
};


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
      </Stage>
        <TresholdComponent/>
      </div>
    );
  }

  export default RightPanel;