 let pokemonRepository = (function() {  
    let repository = [];

    //Pokemon API//
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    //lets new pokemon be added to repository//
    function add(pokemon) {
        repository.push(pokemon);
    }

    //Adds pokemon to repository from API//
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
    }

    //Returns Repository//
    function getAll() {
        return repository;
    }

    //Loads details for the selected pokemon//
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }

    //Consol logs the details of the selected polemon//
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
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

    return {
        add: add,
        loadList: loadList,
        getAll: getAll,
        addListItem: addListItem
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });