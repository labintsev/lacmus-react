import React, { useEffect, useRef } from 'react'; 

function CanvasComponent({imageSrc}) { 
    const canvasRef = useRef(null); 
    useEffect(() => { 
        const canvas = canvasRef.current; 
        const context = canvas.getContext('2d'); 
        const image = new Image(); 
        const handleImageLoad = () => { 
            context.drawImage(image, 0, 0); // Draw the image at position (0, 0) on the canvas 
        }; 
        
        image.addEventListener('load', handleImageLoad); 
        image.src = imageSrc; // Set the image source 
        return () => { 
            image.removeEventListener('load', handleImageLoad); 
        }; 
    }, []); 
    
    return <canvas ref={canvasRef} />;
};

function TresholdComponent(){
    return (
        <label>
        Treshold:
        <input
            className="pure-form" 
            type="range"
            min="1"
            max="99"
            width="600"/>
        </label>
    )
}

function RightPanel() {
    return (
      <div className="pure-u-4-5 right-panel">
        <CanvasComponent/>
        <TresholdComponent/>
      </div>
    );
  }

  export default RightPanel;