const imageInput = document.getElementById("imageInput");
const topTextInput = document.getElementById("topText");
const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
const downloadBtn = document.getElementById("downloadBtn");

let image = new Image();

// Load image
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  image.src = URL.createObjectURL(file);

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    drawMeme();
  };
});

// Update text while typing
topTextInput.addEventListener("input", drawMeme);

// Draw meme
function drawMeme() {
  if (!image.src) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);

  const fontSize = canvas.width / 10;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = fontSize / 10;
  ctx.font = `${fontSize}px Impact`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  wrapText(
    topTextInput.value,
    canvas.width / 2,   // center x
    fontSize * 1.2,     // padding from top
    canvas.width - 40,  // max text width
    fontSize * 1.1      // line spacing
  );
}

// Auto‑wrap function
function wrapText(text, x, startY, maxWidth, lineHeight) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine + words[i] + " ";
    if (ctx.measureText(testLine).width > maxWidth && i > 0) {
      lines.push(currentLine);
      currentLine = words[i] + " ";
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);

  let y = startY;

  for (let i = 0; i < lines.length; i++) {
    const lineY = y + i * lineHeight;
    ctx.strokeText(lines[i], x, lineY);
    ctx.fillText(lines[i], x, lineY);
  }
}

// Download meme
downloadBtn.addEventListener("click", () => {
  if (!image.src) return;

  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
