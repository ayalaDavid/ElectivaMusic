const songs = [
  { title: "PURPLE STAIN", artist: "RED HOT CHILI PEPPERS", img: "img/PurpleStain.jpeg", position: 0, favorite: false },
  { title: "THE NIGHTS", artist: "AVICII", img: "img/TheNights.jpg", position: 1, favorite: false },
  { title: "NEVER ENOUGH", artist: "EMINEM", img: "img/NeverEnough.jpg", position: 2, favorite: false },
  { title: "SONRISA", artist: "VILLAGRAN BOLAÑOS", img: "img/Sonrisa.jpg", position: 3, favorite: false },
  { title: "YOUNG, WILD & FREE", artist: "SNOOP DOG", img: "img/YWF.jpeg", position: 4, favorite: false }
];

console.log("Inicia aplicación");
function assignFavorites() {
  songs.forEach(song => song.favorite = false);
  const favoriteCount = Math.floor(Math.random() * 2) + 1;
  const selectedFavorites = new Set();

  while (selectedFavorites.size < favoriteCount) {
    const randomIndex = Math.floor(Math.random() * songs.length);
    selectedFavorites.add(randomIndex);
  }

  selectedFavorites.forEach(index => {
    songs[index].favorite = true;
  });
}

function displayRanking() {
  const rankingList = document.getElementById("ranking");
  rankingList.innerHTML = "";
  console.log("Mezcla ranking");
  songs.forEach((song, index) => {
    let arrow = "";
    if (index === 0) arrow = "";
    else if (song.position > index) arrow = `<span class="arrow up">⬆️</span>`;
    else if (song.position < index) arrow = `<span class="arrow down">⬇️</span>`;
    else arrow = `<span class="arrow stay">⛔</span>`;

    const favoriteStar = song.favorite ? `<span class="favorite">⭐</span>` : "";

    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${song.img}" alt="${song.title}">
      <div class="song-info">
        <div class="title">${index + 1}. ${song.title} ${favoriteStar}</div>
        <div class="artist">${song.artist}</div>
      </div>
      ${arrow}
    `;
    rankingList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  assignFavorites();
  displayRanking();
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
  songs.sort(() => Math.random() - 0.5);
  assignFavorites();
  displayRanking();
});

function createImage() {
  const container = document.getElementById("ranking");

  html2canvas(container, { scale: 2 }).then(canvas => {
    const image = canvas.toDataURL("image/png");
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = "";

    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.alt = "Ranking generado";
    imgElement.style.marginTop = "20px";
    imgElement.style.border = "1px solid #ddd";
    imgElement.style.maxWidth = "100%";
    imageContainer.appendChild(imgElement);

    // Botón para descargar la imagen
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Exportar Imagen en formato PNG";
    downloadButton.classList.add("btn-primary");
    downloadButton.style.marginTop = "10px";
    downloadButton.onclick = () => {
      const a = document.createElement("a");
      a.href = image;
      a.download = "ranking-musical.png";
      a.click();
    };

    // Botón para exportar a PDF
    const exportPdfButton = document.createElement("button");
    exportPdfButton.textContent = "Exportar a PDF";
    exportPdfButton.classList.add("btn-primary");
    exportPdfButton.style.marginTop = "10px";
    exportPdfButton.onclick = () => {
      const { jsPDF } = window.jspdf; // Asegura que jsPDF esté disponible
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Mantener proporción

      try {
        pdf.addImage(image, "PNG", 0, 0, pdfWidth, pdfHeight); // Añadir imagen al PDF
        pdf.save("ranking-musical.pdf");
      } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("Hubo un problema al generar el archivo PDF. Intenta nuevamente.");
      }
    };

    imageContainer.appendChild(downloadButton);
    imageContainer.appendChild(exportPdfButton);
  }).catch(error => {
    console.error("Error al generar la imagen:", error);
    alert("Hubo un problema al generar la imagen. Intenta nuevamente.");
  });
}

document.getElementById("createImgBtn").addEventListener("click", createImage);
