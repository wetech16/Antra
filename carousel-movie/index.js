const MovieAPI = (function () {
  function getMovies() {
    return fetch("http://localhost:3000/movies").then((res) =>
      res.json()
    );
  }
  return { getMovies };
})();

const View = (function () {
  const domSelectors = {
    movieCardContainer: ".movie__card__container",
    movieCard: ".movie__card",
    cardBtnLeft: ".card__btn-left",
    cardBtnRight: ".card__btn-right",
  };
  function generateMovieCardContent({ imgUrl, name, outlineInfo }) {
    return `<div class="movie__card">
        <img src="${imgUrl}" alt="" />
        <h2 class="movie__card__title">Movie: ${name}</h2>
        <p class="move__card__info">info: ${outlineInfo}
    </div>`;
  }
  function generateMovieCards(movies) {
    return movies
      .map((movie) => generateMovieCardContent(movie))
      .join("");
  }
  function renderMoveCards(movies) {
    const temp = generateMovieCards(movies);
    const ele = document.querySelector(
      domSelectors.movieCardContainer
    );
    render(ele, temp);
  }
  function render(element, template) {
    element.innerHTML = template;
  }
  return {
    renderMoveCards,
    domSelectors,
  };
})();

const Model = (function (movieAPI) {
  return { movieAPI };
})(MovieAPI);

const Controller = (function (view, model) {
  class State {
    constructor() {
      this._movies = [];
      this.start = 0;
      this.end = this.start + 4;
    }
    get movies() {
      return this._movies;
    }
    set movies(newMovies) {
      this._movies = newMovies;
      view.renderMoveCards(this._movies);
    }
  }
  let state = new State();

  function display4Cards() {
    //btn display
    const btnLeft = document.querySelector(
      view.domSelectors.cardBtnLeft
    );
    const btnRight = document.querySelector(
      view.domSelectors.cardBtnRight
    );
    if (state.start == 0) {
      btnLeft.style.display = "none";
    } else {
      btnLeft.style.display = "flex";
    }
    if (state.end == state.movies.length) {
      btnRight.style.display = "none";
    } else {
      btnRight.style.display = "flex";
    }

    // card display
    const ele = document.querySelector(
      view.domSelectors.movieCardContainer
    );
    let l = state.movies.length;
    for (let i = 0; i < l; i++) {
      ele.childNodes[i].style.display = "none";
    }
    for (let i = state.start; i < state.end; i++) {
      ele.childNodes[i].style.display = "block";
    }
  }
  function setUpEvent() {
    document
      .querySelector(view.domSelectors.cardBtnLeft)
      .addEventListener("click", (e) => {
        state.start--;
        state.end--;
        display4Cards();
      });
    document
      .querySelector(view.domSelectors.cardBtnRight)
      .addEventListener("click", (e) => {
        state.start++;
        state.end++;
        display4Cards();
      });
  }
  function init() {
    model.movieAPI.getMovies().then((movieData) => {
      state.movies = movieData;
      display4Cards();
      setUpEvent();
    });
  }
  return {
    init,
  };
})(View, Model);

Controller.init();
