const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("color-picker");
const randomColorButton = document.getElementById("random-color-btn");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const downloadButton = document.getElementById("download-btn");

let currentColor = colorPicker.value;
let currentWidth = widthInput.value;
let currentHeight = heightInput.value;

ctx.fillStyle = currentColor;
ctx.fillRect(0, 0, currentWidth, currentHeight);

// 色の変更イベントハンドラ
colorPicker.addEventListener("change", changeColor);

// ランダムカラー生成ボタンのイベントハンドラ
randomColorButton.addEventListener("click", () => {
  colorPicker.value = getRandomColor();
  changeColor();
});

// 解像度変更イベントハンドラ
widthInput.addEventListener("input", changeResolution);
heightInput.addEventListener("input", changeResolution);

// プリセットボタンのイベントハンドラ
const presetButtons = document.querySelectorAll('input[name="preset"]');
presetButtons.forEach((button) => {
  button.addEventListener("change", () => {
    if (button.checked) {
      const resolution = button.value.split(",");
      const width = parseInt(resolution[0]);
      const height = parseInt(resolution[1]);
      widthInput.value = width;
      heightInput.value = height;
      changeResolution();
      updateActivePresetButton(width, height);
    }
  });
});

// ダウンロードボタンのイベントハンドラ
downloadButton.addEventListener("click", downloadIcon);

document.addEventListener("DOMContentLoaded", () => {
  changeColor();
});

function changeColor() {
  currentColor = colorPicker.value;
  ctx.fillStyle = currentColor;
  ctx.fillRect(0, 0, currentWidth, currentHeight);
}

function changeResolution() {
  currentWidth = Math.max(1, parseInt(widthInput.value));
  currentHeight = Math.max(1, parseInt(heightInput.value));
  widthInput.value = currentWidth;
  heightInput.value = currentHeight;
  canvas.width = currentWidth;
  canvas.height = currentHeight;
  ctx.fillStyle = currentColor;
  ctx.fillRect(0, 0, currentWidth, currentHeight);
}

function updateActivePresetButton(width, height) {
  presetButtons.forEach((button) => {
    if (
      parseInt(button.value) === width &&
      parseInt(button.value.height) === height
    ) {
      button.parentElement.classList.add("active");
    } else {
      button.parentElement.classList.remove("active");
    }
  });
}

function downloadIcon() {
  const link = document.createElement("a");
  link.download = "icon.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.addEventListener("DOMContentLoaded", () => {
  const colorPicker = document.getElementById("color-picker");
  colorPicker.value = getRandomColor();
  const event = new Event("change");
  colorPicker.dispatchEvent(event);
});
