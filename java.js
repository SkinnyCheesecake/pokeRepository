document.addEventListener('DOMContentLoaded', (event) => {
    const pokemonLista = document.querySelector("#listaPokemon");
    const btnHeader = document.querySelectorAll(".btn-header");

    let URL = "https://pokeapi.co/api/v2/pokemon/";
    let allPokemonData = [];

    // Fetch all Pokémon data
    for(let i = 1; i <= 151; i++){
        fetch(URL + i)
            .then(response => response.json())
            .then(data => {
                allPokemonData.push(data);
                // Display all Pokémon initially
                if (allPokemonData.length === 151) {
                    displayPokemon(allPokemonData);
                }
            });
    }

    btnHeader.forEach(boton => boton.addEventListener("click", (e) => {
        const btnID = e.currentTarget.id;
        pokemonLista.innerHTML = "";

        if(btnID === "ver-todos"){
            displayPokemon(allPokemonData);
        } else {
            const filteredData = allPokemonData.filter(pokemon => {
                const types = pokemon.types.map(type => type.type.name);
                return types.includes(btnID);
            });
            displayPokemon(filteredData);
        }
    }));

    function displayPokemon(pokemonDataArray){
        pokemonDataArray.forEach(data => {
            let types = data.types.map(type => type.type.name).join(', ');


            let pokeId = data.id.toString();

            if(pokeId.length === 1){
                pokeId = "00" + pokeId;
            } else if (pokeId.length === 2){
                pokeId = "0" + pokeId;
            }

            const newElement = document.createElement("div");
            newElement.classList.add("pokeCard");

            newElement.innerHTML = `
                <div class="frontCard">
                    <h1 class="id" id="pokeId">#${pokeId}</h1>
                    <div class="pokeImg">
                        <img id="pokePic" src="${data.sprites.front_default}" alt="${data.name}">
                    </div>
                    <div class="pokeIdName">
                        <p class="name" id="pokeName">${data.name}</p>
                        <p class="nameId" id="pokeNameId">#${pokeId}</p>
                    </div>
                </div>
                <div class="backCard">
                    <div class="information">
                        <div class="pokeTypes">
                            ${data.types.map(type => `<p class="type ${type.type.name}">${type.type.name}</p>`).join('')}
                        </div>
                        <div class="pokeInfo">
                            <p class="info weight">weight: ${data.weight / 10}kg</p>
                            <p class="info height">height: ${data.height / 10}m</p>
                        </div>
                    </div>
                </div>`;
            pokemonLista.append(newElement);
        });
    }
});
