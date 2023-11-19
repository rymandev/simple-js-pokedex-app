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

  //Consol logs and shows the details of the selected pokemon//
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(title, text) {
      console.log(pokemon);
      title = pokemon.name;
      text = "height: " + pokemon.height/10 + "m"

      // Add pokemon sprite
      let sprite = document.createElement("img");
      sprite.src = pokemon.imageUrl;

      // Clear all existing modal content
      modalContainer.innerHTML = "";

      //Add new div inside modalContainer
      let modal = document.createElement("div");
      modal.classList.add("modal");

      // Add the new modal content
      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerText = "CLOSE";
      closeButtonElement.addEventListener("click", hideModal);

      let titleElement = document.createElement("h1");
      titleElement.innerText = title;

      let contentElement = document.createElement("p");
      contentElement.innerText = text;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(sprite);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add("is-visible");
    });

    function hideModal() {
      modalContainer.classList.remove("is-visible");
    };

    window.addEventListener("keydown", (e) => {
      let modalContainer = document.querySelector("#modal-container");
      if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
        hideModal();  
      }
    });

    modalContainer.addEventListener("click", (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    document.querySelector("#show-modal").addEventListener("click", () => {
      showModal();
    });
  };


  //populates .pokemon-list with buttons labeled with each pokemon"s name from repository//
  function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      pokemonList.classList.add("ul")
      let listItem = document.createElement("li");
      listItem.classList.add("li")
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("btn btn-primary");
      button.addEventListener("click", function (event) {
      console.log(event);
      showDetails(pokemon);
      });
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
  };

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