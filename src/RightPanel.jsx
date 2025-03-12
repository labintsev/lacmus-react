import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const stub_boxes = [
  { 'x': 200, 'y': 100, 'w': 100, 'h': 50, 's': 0.5 }
]
const PREDICT_ENDPOINT = `http://127.0.0.1:5000/predict`;
//const PREDICT_ENDPOINT = `http://192.168.0.200:5000/predict`; // orange pi 5 address
const token = 'rknn';
const request_config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

const CanvasImageComponent = ({ imageUrl, thresh, boxes }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1); // Image scale factor
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Image position
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = parent.innerWidth * 0.85;
    canvas.height = parent.innerHeight;
    const context = canvas.getContext('2d');
    context.lineWidth = 5;
    context.strokeStyle = 'red';
    const image = new Image();

    // Redraw the image on the canvas whenever it loads or the state changes
    const drawImage = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      context.save();

      // Calculate the boundaries
      const imageWidth = image.width * scale;
      const imageHeight = image.height * scale;
      const minX = Math.min(0, canvas.width - imageWidth);
      const minY = Math.min(0, canvas.height - imageHeight);
      const maxX = Math.max(0, canvas.width - imageWidth);
      const maxY = Math.max(0, canvas.height - imageHeight);

      // Adjust the position to stay within boundaries
      position.x = Math.max(minX, Math.min(position.x, maxX));
      position.y = Math.max(minY, Math.min(position.y, maxY));

      context.translate(position.x, position.y); // Apply the position
      context.scale(scale, scale); // Apply the scaling
      context.drawImage(image, 0, 0); // Draw the image
      for (const box of boxes) {
        if (box.s > thresh) {
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
  
  useEffect(() => {
    setBoxes([]);
  }, [imageFile]);

  const parseBoxesArray = (data_str) => {

    const cleanedStr = data_str['boxes'].replace(/[\[\]]/g, '').trim();
    const elements = cleanedStr.split(/\s+/);

    const cleanedScores = data_str['scores'].replace(/[\[\]]/g, '').trim();
    const scoreElements = cleanedScores.split(/\s+/);
    // Group the elements into arrays of 4 numbers each
    const boxes = [];
    for (let i = 0; i < elements.length; i += 4) {
      const box = elements.slice(i, i + 4).map(Number);
      boxes.push({
        x: box[0],
        y: box[1],
        w: box[2] - box[0],
        h: box[3] - box[1],
        s: Number(scoreElements[i / 4])
      });
    }
    console.log('boxes: ', boxes);
    return boxes;
  };

  const predictByForm = () => {
    setBoxes([]);
    const form = new FormData();
    form.append('image_file', imageFile)
    const { promise } = axios.post(
      PREDICT_ENDPOINT, form, request_config).then(
        response => {
          console.log('data', response);
          const boxes_ = parseBoxesArray(response['data']);
          setBoxes(boxes_);
        })
      .catch(error => {
        console.error('Error during prediction:', error);
        // Handle the error appropriately here
        alert('An error occurred during prediction. Using stub boxes.');
        setBoxes(stub_boxes);
      });
  }

  const changeThresh = (e) => {
    setThresh(e.target.value / 100)
  }

  return (
    <div className="right-panel">
      <CanvasImageComponent imageUrl={imgUrl} thresh={thresh} boxes={boxes} />

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