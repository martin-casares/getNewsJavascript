const myModal = new bootstrap.Modal(document.getElementById("myModal"));

const getData = async () => {
  return await fetch(
    "https://hn.algolia.com/api/v1/search_by_date?query=javascript&page=0"
  )
    .then((response) => response.json())
    .then((json) => json.hits);
};

const createCards = async () => {
  const containerCards = document.getElementById("container-cards");
  const data = await getData();
  localStorage.setItem("dataAPI", JSON.stringify(data));

  const cards = data.map(
    (info) =>
      `<div class="card">
        <div class="card-body">
          <h5 class="card-title">${info.author}</h5>
          <p class="card-text">${info.story_title}</p>
          <a href="#" class="btn btn-primary" onclick="addFav(${info.objectID})">❤</a>
          <a href="#" class="btn btn-success" onclick="showModal(${info.objectID})">Read</a>
        </div>
      </div>
      `
  );
  containerCards.innerHTML = cards;
};

createCards();

const addFav = (objectID) => {
  const data = JSON.parse(localStorage.getItem("dataAPI"));

  let existingFavs = JSON.parse(localStorage.getItem("myFavs") || []);

  let fav = data.find((info) => info.objectID == objectID);

  existingFavs.push(fav);

  console.log(existingFavs);

  localStorage.setItem("myFavs", JSON.stringify(existingFavs));
  alert(`${fav.story_title} se agrego a favoritos`);
};

const showModal = (id) => {
  myModal.show();
  const data = JSON.parse(localStorage.getItem("dataAPI"));
  let notice = data.find((info) => info.objectID == id);

  let modalTitle = document.getElementById("modal-title");
  let modalBody = document.getElementById("modal-body");

  title = `<h3>${notice.story_title}</h3> `;
  body = `<p>${notice.comment_text}</p>`;

  modalTitle.innerHTML = title;
  modalBody.innerHTML = body;

  /* document
   *   .querySelector("button-close")
   *   .addEventListener("click", myModal.hide()); */
};
