const image = document.getElementById('image');
const viewer = document.querySelector('.image-viewer');

let scale = 1;
let originX = 0, originY = 0;
let startX = 0, startY = 0;
let isDragging = false;

// Update the image transformation
function updateTransform() {
    image.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
}

// Handle mouse wheel zoom
viewer.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    const rect = image.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const zoomFactor = 1.1;
    if (e.deltaY < 0) {
        scale *= zoomFactor;  // Zoom in
    } else {
        scale /= zoomFactor;  // Zoom out
    }
    
    // Adjust origin to zoom into the mouse position
    originX -= mouseX * (zoomFactor - 1) * (e.deltaY < 0 ? 1 : -1);
    originY -= mouseY * (zoomFactor - 1) * (e.deltaY < 0 ? 1 : -1);

    updateTransform();
});

// Handle mouse drag to pan the image
viewer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - originX;
    startY = e.clientY - originY;
    viewer.style.cursor = 'grabbing';
});

viewer.addEventListener('mousemove', (e) => {
    if (isDragging) {
        originX = e.clientX - startX;
        originY = e.clientY - startY;
        updateTransform();
    }
});

viewer.addEventListener('mouseup', () => {
    isDragging = false;
    viewer.style.cursor = 'grab';
});

viewer.addEventListener('mouseleave', () => {
    isDragging = false;
    viewer.style.cursor = 'grab';
});
