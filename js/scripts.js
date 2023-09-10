 let pokemonRepository = (function() {  
    var pokemonList = [
        {
            name: 'Bulbasaur', 
            height: 0.7, 
            type: ['grass', 'poison']
        },
        {
            name: 'Ivysaur', 
            height: 1, 
            type: ['grass', 'poison']
        },
        {
            name: 'Venusaur', 
            height: 2, 
            type: ['grass', 'poison']
        },
        {
            name: 'Charmander', 
            height: 0.6, 
            type: ['fire']
        },
        {
            name: 'Charmeleon', 
            height: 1.1, 
            type: ['fire']
        },
        {
            name: 'Charizard', 
            height: 1.7, 
            type: ['fire', 'flying']
        },
        {
            name: 'Squirtle', 
            height: 0.5, 
            type: ['water']
        },
        {
            name: 'Wartortle', 
            height: 1, 
            type: ['water']
        },
        {
            name: 'Blastoise', 
            height: 1.6, 
            type: ['water']
        },
        {
            name: 'Caterpie', 
            height: 0.3, 
            type: ['bug']
        },
        {
            name: 'Metapod', 
            height: 0.7, 
            type: ['bug']
        },
        {
            name: 'Butterfree', 
            height: 1.1, 
            type: ['bug', 'flying']
        },
        {
            name: 'Weedle', 
            height: 0.3, 
            type: ['bug', 'poison']
        },
        {
            name: 'Kakuna', 
            height: 0.6, 
            type: ['bug', 'poison']
        },
        {
            name: 'Beedrill', 
            height: 1, 
            type: ['bug', 'poison']
        }
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

// Displays name and height of Pokémon with a note if they are taller than 1 meter
function printArrayDetails(list){  
        let note; 
            if (list.height > 1) {
                note = ' - So big!';
                } else {
                    note = ''
                } 
    
        document.write(
            list.name + 
            ' (height: ' + 
            list.height + ')' +
            note + '<br/>' + '<br/>'
            )
}

pokemonRepository.getAll().forEach(printArrayDetails);