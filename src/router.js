let Routes = {
    pokemons: 'https://pokeapi.co/api/v2/pokemon/'
};

const Router = function () {
    this.initPage = function (route) {
        //if we are on pokemon details
        if ( route.includes('?id=') ) {
            const pokemonID = getIdFromPageHref();

            //render single pokemon details
            getPokemons(Routes.pokemons)
                .then ( () => getPokemon(Routes[pokemonID]) );
        } else {
            //render pokemons list
            renderPokemonList(Routes.pokemons);
        }
    };
};

Router.prototype.getCurrentRoute = function () {
    return window.location.href;
};

function getIdFromPageHref() {
    return Router.prototype.getCurrentRoute()[Router.prototype.getCurrentRoute().length - 1];
}

Router.prototype.addRoute = function (id, url) {
    Routes[id] = url;
};



