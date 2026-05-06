// Rubik’s cube color palette (approx real cube colors)
const PALETTE = [
    [255, 255, 255],  // white
    [255, 255, 0],    // yellow
    [0, 150, 0],      // green
    [0, 80, 200],     // blue
    [200, 30, 30],    // red
    [255, 140, 0]     // orange
];

const MOVES = ["R","L","U","D","F","B"];
const MODS = ["","'","2"];

function nearestColor(r, g, b) {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < PALETTE.length; i++) {
        let [pr, pg, pb] = PALETTE[i];
        let d = (r-pr)**2 + (g-pg)**2 + (b-pb)**2;
        if (d < bestDist) {
            bestDist = d;
            best = i;
        }
    }
    return PALETTE[best];
}

function generateScramble(difficulty) {
    const lengths = {
    easy: 5,
    medium: 12,
    hard: 20,
    spectacular: 60   // NEW
};
    let len = lengths[difficulty];
    let out = [];
    for (let i=0;i<len;i++){
        out.push(MOVES[Math.floor(Math.random()*MOVES.length)] +
                 MODS[Math.floor(Math.random()*MODS.length)]);
    }
    return out.join(" ");
}

// Apply Floyd-Steinberg Dithering
function ditherImage(imgData, w, h) {
    let data = imgData.data;

    function idx(x, y) { return (y*w + x)*4; }

    for (let y=0; y<h; y++) {
        for (let x=0; x<w; x++) {

            let i = idx(x,y);

            // old pixel
            let oldR = data[i];
            let oldG = data[i+1];
            let oldB = data[i+2];

            let [newR, newG, newB] = nearestColor(oldR, oldG, oldB);

            data[i]   = newR;
            data[i+1] = newG;
            data[i+2] = newB;

            // error
            let errR = oldR - newR;
            let errG = oldG - newG;
            let errB = oldB - newB;

            function distribute(dx, dy, factor) {
                let nx = x+dx, ny = y+dy;
                if (nx>=0 && nx<w && ny>=0 && ny<h) {
                    let ni = idx(nx, ny);
                    data[ni]   += errR * factor;
                    data[ni+1] += errG * factor;
                    data[ni+2] += errB * factor;
                }
            }

            distribute(1, 0, 7/16);
            distribute(-1, 1, 3/16);
            distribute(0, 1, 5/16);
            distribute(1, 1, 1/16);
        }
    }
}

document.getElementById("generateBtn").onclick = () => {

    const fileInput = document.getElementById("imageInput");
    const mosaicWidth = parseInt(document.getElementById("mosaicWidth").value);
    const difficulty = document.getElementById("difficulty").value;
    const scrambleOutput = document.getElementById("scrambleOutput");

    if (!fileInput.files[0]) {
        alert("Upload an image first!");
        return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(fileInput.files[0]);

    img.onload = () => {

        const previewCanvas = document.getElementById("previewCanvas");
        const mosaicCanvas = document.getElementById("mosaicCanvas");
        const pctx = previewCanvas.getContext("2d");
        const mctx = mosaicCanvas.getContext("2d");

        // Resize image to mosaic width
        let ratio = img.height / img.width;
        let w = mosaicWidth;
        let h = Math.floor(w * ratio);

        previewCanvas.width = w;
        previewCanvas.height = h;

        // Draw small preview version
        pctx.drawImage(img, 0, 0, w, h);

        // Get pixel data
        let imgData = pctx.getImageData(0, 0, w, h);

        // Apply dithering with cube palette
        ditherImage(imgData, w, h);
        pctx.putImageData(imgData, 0, 0);

        // Draw full mosaic (bigger canvas)
        mosaicCanvas.width = w * 10;
        mosaicCanvas.height = h * 10;

        for (let y=0; y<h; y++) {
            for (let x=0; x<w; x++) {
                let i = (y*w + x)*4;
                let r = imgData.data[i];
                let g = imgData.data[i+1];
                let b = imgData.data[i+2];

                mctx.fillStyle = `rgb(${r},${g},${b})`;
                mctx.fillRect(x*10, y*10, 10, 10);
            }
        }

        // Placement + Scrambles
        scrambleOutput.textContent = "";
        let idx = 1;
        for (let y=1; y<=h; y++) {
            for (let x=1; x<=w; x++) {
                scrambleOutput.textContent +=
                    `Cube ${idx} → Row ${y}, Column ${x}\n` +
                    `Scramble: ${generateScramble(difficulty)}\n\n`;
                idx++;
            }
        }
    };
};
