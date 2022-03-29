const AlbumApi = (function () {
  function getAlbums(searchTerm) {
    return fetchJsonp(
      `https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=200`
    ).then((res) => res.json());
  }
  return {
    getAlbums,
  };
})();

const View = (function () {
  const domSelectors = {
    navInput: ".nav__input",
    albumContainer: ".album__container",
    searchForm: ".search__form",
    searchTitle: ".search__title",
  };
  function generateAlbumCardContent({
    collectionName,
    artworkUrl100,
  }) {
    return `<div class="album__card">
<img src="${artworkUrl100}" alt="" class="album__img" />
<p class="album__info">${collectionName}</p>
</div>`;
  }
  function generateAlbumCards(albums) {
    return albums
      .map((album) => generateAlbumCardContent(album))
      .join("");
  }
  function renderAlbumsCards(albums) {
    const temp = generateAlbumCards(albums);
    const ele = document.querySelector(domSelectors.albumContainer);
    render(temp, ele);
  }
  function render(temp, ele) {
    ele.innerHTML = temp;
  }
  return {
    domSelectors,
    renderAlbumsCards,
  };
})();

const Model = (function (albumApi) {
  return { albumApi };
})(AlbumApi);

const Controller = (function () {
  class State {
    constructor() {
      this._albums = [];
    }
    get albums() {
      return this._albums;
    }
    set albums(newAlbums) {
      this._albums = newAlbums;
      View.renderAlbumsCards(this._albums.results);
    }
  }
  let state = new State();
  function setUpEvent() {
    document
      .querySelector(View.domSelectors.searchForm)
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const inputEle = document.querySelector(
          View.domSelectors.navInput
        );

        getAlbum(inputEle.value);
        inputEle.value = "";
      });
  }
  function getAlbum(searchText) {
    //preload
    const albumContainerEle = document.querySelector(
      View.domSelectors.albumContainer
    );
    const titleEle = document.querySelector(
      View.domSelectors.searchTitle
    );
    albumContainerEle.innerHTML = "";
    albumContainerEle.className = "album__container loader";
    //album cards
    Model.albumApi.getAlbums(searchText).then((albums) => {
      state.albums = albums;
      //title
      albumContainerEle.className = "album__container";
      titleEle.className = "search__title";
      titleEle.innerHTML = `${albums.resultCount} Results Of ${searchText}`;
      titleEle.style.borderBottom = "1px solid grey";
    });
  }
  function init() {
    setUpEvent();
  }
  return {
    init,
  };
})();

Controller.init();
