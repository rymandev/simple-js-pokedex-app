let pokemonRepository = (function() {
  let modalContainer = document.querySelector("#modal-container");  
  let repository = [];

  //Pokemon API//
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

  //lets new pokemon be added to repository//
  function add(pokemon) {
    repository.push(pokemon);
  };

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
  };

  //Returns Repository//
  function getAll() {
    return repository;
  };

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
  };

  //populates .pokemon-list with buttons labeled with each pokemon"s name from repository//
  function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      pokemonList.classList.add("ul")
      pokemonList.classList.add("list-group")
      let listItem = document.createElement("li");
      listItem.classList.add("li")
      listItem.classList.add("list-group-item")
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("btn");
      button.classList.add("btn-primary");
      button.setAttribute("data-bs-toggle", "modal")
      button.setAttribute("data-bs-target", "#pokemonDetail")
      button.addEventListener("click", function (event) {
      console.log(event);
      showDetails(pokemon);
      });

      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
  };

  //Consol logs and shows the details of the selected pokemon//
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    })
  }
  
  function showModal(pokemon){
    let modalBody = document.querySelector (".modal-body");
    let modalTitle = document.querySelector (".modal-title");
    let modalHeader = document.querySelector ('.modal-header');
    modalBody.innerHTML = "";
    modalTitle.innerHTML = "";
    
    //Add pokemon title
    const titleElement = document.createElement ('h1');
    titleElement.innerText = pokemon.name;
    
    //Add pokemon spirite
    let imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.src = pokemon.imageUrl;

    let pokemonHeight = document.createElement("p");
    pokemonHeight.classList.add("modal-items");
    pokemonHeight.innerText = `height: ${(pokemon.height) / 10} m.`;
    console.log(pokemon.types)
    let pokemonTypes = document.createElement("p");
    pokemonTypes.classList.add("modal-items");
    pokemonTypes.innerText = `type: ${(pokemon.types || []).map(el => el.type.name).join(", ")}`;


    modalBody.appendChild(titleElement);
    modalBody.appendChild(imageElement);
    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonTypes);
}

  return {
      add: add,
      loadList: loadList,
      getAll: getAll,
      addListItem: addListItem
  };

})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });