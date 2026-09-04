import { getCharacters } from "./api.js";

const charactersList = document.querySelector("#characters-list");
const charactersLoading = document.querySelector("#characters-loading");
const charactersCount = document.querySelector("#characters-count");
const charactersError = document.querySelector("#characters-error");

async function init() {
  try {
    const characters = await getCharacters();
    renderCharacters(characters);
    charactersCount.textContent = `${characters.length} personajes`;
    charactersLoading.classList.add("d-none");
  } catch (error) {
    console.error("Error loading characters:", error);
    charactersLoading.classList.add("d-none");
    charactersError.classList.remove("d-none");
  }
}

function renderCharacters(characters) {
  characters.forEach((character) => {
    const column = document.createElement("div");
    column.className = "col";

    const card = document.createElement("article");
    card.className = "card h-100 shadow-sm";

    const image = document.createElement("img");
    image.className = "card-img-top";
    image.src = character.image;
    image.alt = `Imagen de ${character.name}`;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const name = document.createElement("h3");
    name.className = "card-title h5 mb-0";
    name.textContent = character.name;

    cardBody.appendChild(name);
    card.append(image, cardBody);
    column.appendChild(card);
    charactersList.appendChild(column);
  });
}

init();
