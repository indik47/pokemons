const getPokemons = function (url) {
    return fetch(url)
        .then ( data => data.json() )
        .then ( pokemons => {
            pokemons.results.forEach( (pokemon, index) => {
                pageRouter.addRoute(index, pokemon.url);
            });
            return pokemons;
        });
};

const getPokemon = function(url) {
    fetch(url)
        .then( data => data.json() )
        .then( pokemon => {
            renderPokemonDetails(pokemon);
        })
};

const renderPokemonList = function (url) {
    const list = document.querySelector('#list');

    getPokemons(url)
        // .then( data => data.json() )
        .then( pokemons => {
            pokemons.results.forEach( (pokemon, index) => {
                if (index < 10) { list.appendChild( renderPokemonListItem( pokemon, index) ); }
            });
            addEventListeners();
        });
    return list;
};

const renderPokemonDetails = function (pokemon) {
    console.log(`renderPokemonDetails pokemon = ` , pokemon);
    const details = document.querySelector('#details');
    const div = document.createElement('div');
    const img = document.createElement('img');

    div.innerText = pokemon.name;
    img.setAttribute('src', `${pokemon.sprites.back_default}`);

    details.appendChild(div);
    div.appendChild(img);
};

const renderPokemonListItem = function(data, index) {
    const row = document.createElement('div');
    const div = row.cloneNode();

    row.setAttribute('class', 'row');
    div.innerText = `${index + 1}: ${data.name}`;
    div.setAttribute('class', 'list__item');
    div.setAttribute('data-id', `${index}`);
    row.appendChild(div);

    return row;
};

const clearPokemonsList = function () {
    const list = document.querySelector('#list');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
};

const addEventListeners = function () {
    const list = document.getElementById('list');
    list.addEventListener('click', function (e) {
        e.preventDefault();
        const pokemonID = e.target.dataset.id;
        history.pushState(null, null, `index.html?id=${pokemonID}`);

        clearPokemonsList();
        getPokemon( Routes[pokemonID] );
    });
};

window.addEventListener('popstate', function () {
    location.reload();
});

var pageRouter = new Router();
var route = pageRouter.getCurrentRoute();

//init page depending on where we are (pokemon list or pokemon details)
pageRouter.initPage(route);
