const AlbumsAPI = (function () {
  function getAlbums(album) {
    return fetchJsonp(
      `https://itunes.apple.com/search?term=${album}&media=music&entity=album&attribute=artistTerm&limit=200`
    ).then((res) => res.json());
  }
  return { getAlbums };
})();

const View = (function () {
  const domSelectors = {
    albumCardContainer: ".album__card__container",
    albumInputBar: ".input-bar__input",
    albumInputSubmit: ".input-bar__submit",
    error: "#error",
    albumSearchTitle: ".album__search__title",
  };
  function generatePreload() {
    return `<div class="loader fixed-center"></div>`;
  }
  function generateAlbumSearchTitle(resultCount, searchValue) {
    return `${resultCount} results for "${searchValue}"`;
  }
  function generateAlbumCardContent({
    collectionName,
    artworkUrl100,
  }) {
    return `<div class="album__card">
          <img src="${artworkUrl100}" alt="" />
          <h2 class="movie__card__title">Movie: ${collectionName}</h2>
      </div>`;
  }
  function generateAblumCards(albums) {
    return albums
      .map((album) => generateAlbumCardContent(album))
      .join("");
  }
  function renderAlbumsCards(albums) {
    const temp = generateAblumCards(albums);
    const ele = document.querySelector(
      domSelectors.albumCardContainer
    );
    render(ele, temp);
  }
  function renderAlumTitle(count, seachText) {
    const temp = generateAlbumSearchTitle(count, seachText);
    const ele = document.querySelector(domSelectors.albumSearchTitle);
    ele.style.borderBottom = "1px solid lightseagreen";
    render(ele, temp);
  }
  function renderPreload() {
    const temp = generatePreload();
    const ele = document.querySelector(
      domSelectors.albumCardContainer
    );
    render(ele, temp);
  }
  function render(element, template) {
    element.innerHTML = template;
  }
  return {
    renderAlbumsCards,
    renderAlumTitle,
    renderPreload,
    domSelectors,
  };
})();

const Model = (function (AlbumsAPI) {
  return { AlbumsAPI };
})(AlbumsAPI);

const Controller = (function (view, model) {
  class State {
    constructor() {
      this._albums = [];
    }
    get albums() {
      return this._albums;
    }
    set albums(newAlbums) {
      this._albums = newAlbums;
      view.renderAlbumsCards(this._albums.results);
    }
  }
  let state = new State();

  function setUpEvent() {
    document
      .querySelector(view.domSelectors.albumInputSubmit)
      .addEventListener("click", (e) => {
        const inputEle = document.querySelector(
          view.domSelectors.albumInputBar
        );
        const errorEle = document.querySelector(
          view.domSelectors.error
        );
        const newAlbum = inputEle.value;
        if (newAlbum == "") {
          errorEle.textContent = "input field can not be empty";
        } else {
          errorEle.textContent = "";
          inputEle.value = "";
          getAlbum(newAlbum);
        }
      });
    document
      .querySelector(view.domSelectors.albumInputBar)
      .addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          document
            .querySelector(view.domSelectors.albumInputSubmit)
            .click();
        }
      });
  }
  function getAlbum(album) {
    preLoad();
    model.AlbumsAPI.getAlbums(album).then((albumData) => {
      state.albums = albumData;
      console.log(albumData);
      view.renderAlumTitle(albumData.resultCount, album);
    });
  }
  function preLoad() {
    view.renderAlumTitle(0, "Searching");
    view.renderPreload();
  }
  function init() {
    setUpEvent();
  }
  return {
    init,
  };
})(View, Model);

Controller.init();
