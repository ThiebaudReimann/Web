
limit = 400
c_x = 2
c_y = 2

function getNewX(x) {
    newX = c_x*x;
    if(newX > limit) {
        while(newX>=limit) {
            newX = newX % limit;
        }
    }
    return newX;
}
function getNewY(y) {
    newY = c_y*y;
    if(newY >= limit) {
        while (newY>=limit) {
            newY = newY % limit;
        }
    }
    return newY;
}

function createMatrix(event) {
    let file = event.target.files[0];
let imageType = /image.*/;

// Erstellen Sie ein Image-Element und laden Sie das Bild
let img = new Image();
img.src = URL.createObjectURL(file);

// Warten, bis das Bild geladen ist
img.onload = function() {
    // Erstellen Sie ein Canvas-Element mit der Zielgröße (480p)
    let canvas = document.createElement('canvas');
    canvas.width = img.width;  // Breite für 480p
    canvas.height = img.height;
    
    let width = limit;
    let height = limit;
/*
    if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
    }
    if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
    }
    */
    canvas.width = width;
    canvas.height = height;

    // Zeichnen Sie das Bild auf dem Canvas und skalieren Sie es auf die Zielgröße
    let context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Extrahieren Sie die Pixelinformationen aus dem skalierten Bild
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let pixelData = imageData.data;
    // Konvertieren Sie die Pixelinformationen in ein 2D-Array
    
    let pixelArray = [];
    console.log(height +"|"+width);
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            let index = (i * width + j) * 4; // Jeder Pixel hat 4 Werte (R, G, B, Alpha)
            let r = pixelData[index];
            let g = pixelData[index + 1];
            let b = pixelData[index + 2];
            
            row.push([r, g, b]);
        }
        pixelArray.push(row);
    }

    // Jetzt haben Sie das verkleinerte Bild in einem 2D-Array (pixelArray) mit 480p Auflösung
    pixels = pixelArray;


    const imageContainer1 = document.getElementById("imageContainer1");
    
    for (let i = 0; i < limit; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < limit; j++) {
            const cell = document.createElement("div");
            cell.style.backgroundColor = `rgb(${pixelArray[i][j][0]}, ${pixelArray[i][j][1]}, ${pixelArray[i][j][2]})`;
            cell.classList.add("cell");
            row.appendChild(cell);
                        
        }
        imageContainer1.appendChild(row);
    }
    
    newPixelArray = [];
    for (let i=0; i< limit; i++) {
        for (let j = 0; j < limit; j++) {
            row = getNewY(i);
            if (!newPixelArray[row]) {
                newPixelArray[row] = [];
            }
            col = getNewX(j);
            
            //console.log(i + "|" + j);
            //console.log(pixels[0][0]);
            newPixelArray[row][col] = [1,2,3];
            //console.log(newPixelArray[xy[1]][xy[0]]);
            newPixelArray[row][col][0] = pixels[i][j][0];
            newPixelArray[row][col][1] = pixels[i][j][1];
            newPixelArray[row][col][2] = pixels[i][j][2];
            console.log(i+"|"+j+"->"+row+"|"+col);
        }
    }
    
    const imageContainerNew = document.getElementById("imageContainerNew");
    
    for (let i = 0; i < limit; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < limit; j++) {
            const cell1 = document.createElement("div");
            cell1.style.backgroundColor = `rgb(${newPixelArray[i][j][0]}, ${newPixelArray[i][j][1]}, ${newPixelArray[i][j][2]})`;
            cell1.classList.add("cell");
            row.appendChild(cell1);
                        
        }
        imageContainerNew.appendChild(row);
    }
    console.log("finish");


};
}

document.getElementById('picture').addEventListener('change', function (event) {
    createMatrix(event);
});