QUnit.test("Render", function( assert ) {
    const pokemonHtmlElement = renderPokemonListItem({id:1, first_name: 'Poki'});
    assert.equal(pokemonHtmlElement.outerHTML, '<div>1: Poki</div>');
});
