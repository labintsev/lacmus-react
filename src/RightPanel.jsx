import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const stub_boxes = [
  { 'x': 100, 'y': 100, 'w': 50, 'h': 50, 's': 0.5 }
]

const CanvasImageComponent = ({ imageUrl, thresh }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1); // Image scale factor
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Image position
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = parent.innerWidth;
    canvas.height = parent.innerHeight;
    const context = canvas.getContext('2d');
    context.lineWidth = 5;
    context.strokeStyle = 'red';
    const image = new Image();

    // Redraw the image on the canvas whenever it loads or the state changes
    const drawImage = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      context.save();
      context.translate(position.x, position.y); // Apply the position
      context.scale(scale, scale); // Apply the scaling
      context.drawImage(image, 0, 0); // Draw the image
      for (const box of stub_boxes){
        if (box.s > thresh){
          context.strokeRect(box.x, box.y, box.w, box.h);
        }
      }
      context.restore();
    };

    image.onload = drawImage;
    image.src = imageUrl;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - lastMousePos.x;
        const dy = e.clientY - lastMousePos.y;
        setPosition((prevPos) => ({
          x: prevPos.x + dx,
          y: prevPos.y + dy,
        }));
        setLastMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const scaleFactor = 1.1;
      if (e.deltaY < 0) {
        setScale(scale * scaleFactor);
      } else {
        setScale(scale / scaleFactor);
      }
    };

    // Attach event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);

    return () => {
      // Cleanup event listeners when component unmounts
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [imageUrl, position, scale, isDragging, lastMousePos]);

  return (
    <canvas
      ref={canvasRef}
      className='main-canvas'
    />
  );
};

function RightPanel({ imageFile }) {
  const [thresh, setThresh] = useState(0.5);
  const [boxes, setBoxes] = useState([]);
  const imgUrl = imageFile ? URL.createObjectURL(imageFile) : '';

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
    <div className="right-panel">
      <CanvasImageComponent imageUrl={imgUrl} thresh={thresh}/>

      <div className='treshold-container'>
        <button onClick={predictByForm} className='predict-button'>Predict</button>
        <label>
          <input
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