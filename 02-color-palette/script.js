const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", (e) => {
  const copyBtn = e.target.closest(".copy-btn");
  const colorBox = e.target.closest(".color");

  let hexValue;
  let successTarget;

  if (copyBtn) {
    hexValue = copyBtn.previousElementSibling?.textContent?.trim();
    successTarget = copyBtn;
  } else if (colorBox) {
    const info = colorBox.nextElementSibling;
    hexValue = info?.querySelector(".hex-value")?.textContent?.trim();
    successTarget = info?.querySelector(".copy-btn");
  } else {
    return;
  }

  if (!hexValue) return;
  navigator.clipboard
    .writeText(hexValue)
    .then(() => successTarget && showCopySuccess(successTarget))
    .catch(console.error);
});

function showCopySuccess(element) {
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");
  element.style.color = "#48bb78";

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 1500);
}

function generatePalette() {
  const colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }

  updatePaletteDisplay(colors);
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePaletteDisplay(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");

  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");

    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
  });
}

// generatePalette();
