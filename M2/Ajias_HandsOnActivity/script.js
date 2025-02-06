async function fetchPokemon() {
    const input = document.getElementById("pokemonInput").value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${input}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Pokémon not found!");

        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        document.getElementById("pokemon-info").innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function displayPokemon(data) {
    const pokemonHTML = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><strong>Type:</strong> ${data.types.map(type => type.type.name).join(", ")}</p>
        <p><strong>Base Experience:</strong> ${data.base_experience}</p>
    `;
    document.getElementById("pokemon-info").innerHTML = pokemonHTML;
}

async function fetchPokemonList() {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=50"; // Fetch first 50 Pokémon
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayPokemonList(data.results);
    } catch (error) {
        console.error("Error fetching Pokémon list:", error);
    }
}

function displayPokemonList(pokemonArray) {
    const pokemonList = document.getElementById("pokemon-list");
    pokemonList.innerHTML = ""; // Clear previous data
    pokemonArray.forEach((pokemon) => {
        const listItem = document.createElement("li");
        listItem.textContent = pokemon.name;
        listItem.onclick = () => {
            document.getElementById("pokemonInput").value = pokemon.name;
            fetchPokemon();
        };
        pokemonList.appendChild(listItem);
    });
}

// Load Pokémon list on page load
document.addEventListener("DOMContentLoaded", fetchPokemonList);
