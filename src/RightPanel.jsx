import React, { useEffect, useRef } from 'react'; 

function CanvasComponent({imageSrc}) { 
    const canvasRef = useRef(null); 

    useEffect(() => { 
        const canvas = canvasRef.current; 
        const canvasContext = canvas.getContext('2d'); 
        const image = new Image(); 
        const handleImageLoad = () => { 
            canvasContext.drawImage(image, 0, 0); // Draw the image at position (0, 0) on the canvas 
        }; 
        
        image.addEventListener('load', handleImageLoad); 
        image.src = imageSrc; // Set the image source 
    }, [imageSrc]); 

    return (
    <div>
        <canvas ref={canvasRef} width={800} height={600}/>
    </div>
    );
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
        <CanvasComponent imageSrc={imageSrc}/>
        <TresholdComponent/>
      </div>
    );
  }

  export default RightPanel;