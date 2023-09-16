 let pokemonRepository = (function() {  
    let repository = [
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

    //lets new pokemon be added to repository//
    function add(pokemon) {
        repository.push(pokemon);
    }

    function getAll() {
        return repository;
    }

    //populates .pokemon-list with buttons labeled with each pokemon's name from repository//
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        button.addEventListener('click', function (event) {
        console.log(event);
        showDetails(pokemon);
        });
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }

    function showDetails(pokemon) {
        console.log(pokemon)
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
    pokemonRepository.showDetails(pokemon);
});