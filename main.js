const imageFileInput = document.querySelector('#imageFileInput');
const topTextInput = document.querySelector('#topTextInput');
const bottomTextInput = document.querySelector('#bottomTextInput');
const canvas = document.querySelector('#meme');

let image;

imageFileInput.addEventListener('change', () => {
    const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

    image = new Image();
    image.src = imageDataUrl;

    /* update onece the image source is loaded, and only call once*/
    image.addEventListener('load', () => {
        updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
    }); 
});

topTextInput.addEventListener('change', () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener('change', () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

function updateMemeCanvas(canvas, image, topTextInput, bottomTextInput) {
    const ctx = canvas.getContext('2d'); // get the context of the canvas
    const { width, height } = image; // get the width and height of the image
    const fontSize = Math.floor(width / 10); // set the font size
    const yOffset = Math.floor(height / 25); // set the y offset
    const xOffset = Math.floor(width / 50); // set the x offset

    //update canvas background
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    // prepare the text
    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';
    ctx.font = `${fontSize}px Impact`; // set the font and font size

    // Add top text
    ctx.textBaseline = 'top';
    ctx.strokeText(topTextInput, width / 2, yOffset);
    ctx.fillText(topTextInput, width / 2, yOffset);


    //  Add bottom text
    ctx.textBaseline = 'bottom';
    ctx.strokeText(bottomTextInput, width / 2, height - yOffset);
    ctx.fillText(bottomTextInput, width / 2, height - yOffset);
}