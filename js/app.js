import {getCharacters} from './api.js';

async function init() {
    try {
        const characters = await getCharacters();
        console.log(characters);
    } catch (error) {
        console.error("Error loading characters:", error);
    }
}

init();