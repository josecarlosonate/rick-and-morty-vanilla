import { getCharacters, getCharactersByName } from "./api.js";

const charactersList = document.querySelector("#characters-list");
const charactersLoading = document.querySelector("#characters-loading");
const charactersCount = document.querySelector("#characters-count");
const charactersError = document.querySelector("#characters-error");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

function getStatusClass(status) {
  const normalized = status?.toLowerCase();
  if (normalized === "alive") return "status-alive";
  if (normalized === "dead") return "status-dead";
  return "status-unknown";
}

function showError(message) {
  charactersError.textContent = message;
  charactersError.classList.remove("d-none");
  charactersCount.textContent = "0 personajes";
}

async function init() {
  try {
    const characters = await getCharacters();
    renderCharacters(characters);
    charactersCount.textContent = `${characters.length} personajes`;
    charactersLoading.classList.add("d-none");
  } catch (error) {
    charactersLoading.classList.add("d-none");
    charactersError.classList.remove("d-none");
  }
}

function renderCharacters(characters) {
  charactersList.innerHTML = "";
  characters.forEach((character) => {
    const column = document.createElement("div");
    column.className = "col";

    const link = document.createElement("a");
    link.href = `./character.html?id=${character.id}`;
    link.className = "text-decoration-none";

    const card = document.createElement("article");
    card.className = "card h-100 shadow-sm";

    const image = document.createElement("img");
    image.className = "card-img-top";
    image.src = character.image;
    image.alt = `Imagen de ${character.name}`;
    image.loading = "lazy";

    const cardBody = document.createElement("div");
    cardBody.className =
      "card-body d-flex justify-content-between align-items-center";

    const name = document.createElement("h3");
    name.className = "card-title h5 mb-0";
    name.textContent = character.name;

    const status = document.createElement("span");
    status.className = `status-badge ${getStatusClass(character.status)}`;
    status.textContent = character.status;

    cardBody.append(name, status);
    card.append(image, cardBody);
    link.appendChild(card);
    column.appendChild(link);
    charactersList.appendChild(column);
  });
}

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = searchInput.value.trim();
  if (!name) {
    showError("Escribe un nombre para buscar.");
    charactersList.innerHTML = "";
    charactersCount.textContent = "0 personajes";
    return;
  }

  charactersError.classList.add("d-none");

  try {
    const characters = await getCharactersByName(name);

    renderCharacters(characters);
    charactersCount.textContent = `${characters.length} personajes`;
  } catch (error) {
    charactersList.innerHTML = "";
    charactersCount.textContent = "0 personajes";
    charactersError.textContent =
      "No se encontraron personajes con ese nombre.";
    charactersError.classList.remove("d-none");
  }
});

init();
