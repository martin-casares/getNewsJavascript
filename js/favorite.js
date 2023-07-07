const getFavorites = () => {
  const myFavorites = JSON.parse(localStorage.getItem("myFavs"));
  const containerCardsFavorites = document.getElementById(
    "container-cards-favorites"
  );

  const cards = myFavorites.map(
    (info) =>
      `<div class="card w-25 m-2">
        <div class="card-body">
          <h5 class="card-title">${info.author}</h5>
          <p class="card-text">${info.story_title}</p>
          <a href="#" class="btn btn-primary" onclick="deleteFav(${info.objectID})">😻</a>
        </div>
       </div>`
  );
  containerCardsFavorites.innerHTML = cards;
};
getFavorites();

const deleteFav = (infoID) => {
  const existingFavs = JSON.parse(localStorage.getItem("myFavs") || []);
  // const itemToDelete = existengFavs.some(({objectID}) => objectID == infoID)

  const newArray = existingFavs.filter(({ objectID }) => objectID != infoID);

  localStorage.setItem("myFavs", JSON.stringify(newArray));
  window.location.href = "favorite.html";
};
