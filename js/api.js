const API_URL = "https://rickandmortyapi.com/api";

export async function getCharacters() {
  const response = await fetch(`${API_URL}/character`);

  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }

  const data = await response.json();
  return data.results;
}

export async function getCharacterById(id) {
    const response = await fetch(`${API_URL}/character/${id}`);
    
    if (!response.ok) {
        throw new Error("Failed to fetch character");
    }

    const data = await response.json();
    return data;
}