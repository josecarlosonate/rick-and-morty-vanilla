import { getCharacterById } from "./api.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function init() {
  if (!id) {
    console.error("No se proporcionó un ID de personaje en la URL.");
    document.getElementById("character-error").classList.remove("d-none");
    document.getElementById("character-loading").classList.add("d-none");
    return;
  }
  try {
    const character = await getCharacterById(id);
    document.getElementById("character-image").src = character.image;
    document.getElementById("character-name").textContent = character.name;
    document.getElementById("character-status").textContent = character.status;
    document.getElementById("character-species").textContent = character.species;
    document.getElementById("character-gender").textContent = character.gender;
    document.getElementById("character-origin").textContent = character.origin.name;
    document.getElementById("character-loading").classList.add("d-none");
    document.getElementById("character-detail").classList.remove("d-none");
  } catch (error) {
    console.error("Error loading character:", error);
    document.getElementById("character-loading").classList.add("d-none");
    document.getElementById("character-error").classList.remove("d-none");
  }
}

init();
