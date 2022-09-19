const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 10;
let offset = 0;
const maxRecords = 151;

function loadPokemonsItens(offset,limit) {
  pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => 
      `
      <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
  
            <div class="details">
              <ol class="types">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
              </ol>
              <img
                src="${pokemon.img}"
                alt="${pokemon.name}"
              />
            </div>
          </li>
      
      
      `
    ).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonsItens(offset,limit)

loadMoreButton.addEventListener('click', () =>{
  offset += limit;

  const qtdRecorddNextPage = offset + limit;

  if(qtdRecorddNextPage >= maxRecords){
    const newLimit = maxRecords - offset;
    loadPokemonsItens(offset,newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  }else(
    
    loadPokemonsItens(offset,limit)
  )
})