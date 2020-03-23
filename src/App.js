import React from 'react';
import CategoriesList from "./components/CategoriesList";
import MoviesCardsList from "./components/MovieCardList/MovieCardsList";
import Header from "./components/Header/Header";
import MovieInfo from "./components/MovieInfo";
import './App.css';

class App extends React.Component {
  NAVIGATION_MODES = [
      'CATEGORY',
      'MOVIES_LIST',
      'MOVIE_INFO'
  ];

  moviesAppRef = React.createRef();

  state = {
    data: null,
    categories: [],
    currentNavigationMode: this.NAVIGATION_MODES[0],
    currentCategory: null,
    currentMovieId: 0,
    currentMovieInfoButton: 0
  };

  prepareData( data ) {
    const categories = data.results.map(item => item.genre_ids)
        .reduce((prev, curr) => prev.concat(curr), [])
        .filter((value, index, self) => self.indexOf(value) === index);

    this.setState({
      data,
      categories,
      currentCategory: categories[0]
    });
  }

  getCurrentMoviesList() {
    if( this.state.data ) {
      return this.state.data.results.filter( val => val.genre_ids.includes(this.state.currentCategory) );
    }
    return [];
  }

  getCurrentMovie() {
    return this.getCurrentMoviesList()[this.state.currentMovieId];
  }

  categoryNavigationHandler(code) {
    const { categories, currentCategory } = this.state;
    const currentCategoryId = categories.indexOf( currentCategory );
    let nextCategoryId;

    switch (code) {

      case 'ArrowDown':
        nextCategoryId = ( ( currentCategoryId + 1 ) === categories.length ) ? 0 : currentCategoryId + 1;
        this.setState({
          currentCategory: categories[nextCategoryId]
        });
        break;

      case 'ArrowUp':
        nextCategoryId = ( currentCategoryId === 0 ) ? categories.length - 1 : currentCategoryId - 1;
        this.setState({
          currentCategory: categories[nextCategoryId]
        });
        break;

      case 'Enter':
        this.setState({
          currentNavigationMode: 'MOVIES_LIST'
        });
        break;
      default:
        break;
    }
  }

  moviesListNavigationHandler(code) {
    const movies = this.getCurrentMoviesList();
    const { currentMovieId } = this.state;
    let nextMovieId;
    switch (code) {
      case 'ArrowRight':
        nextMovieId = ( ( currentMovieId + 1 ) === movies.length ) ? currentMovieId : currentMovieId + 1;
        this.setState({
          currentMovieId: nextMovieId
        });
        break;
      case 'ArrowLeft':
        nextMovieId = ( ( currentMovieId ) === 0 ) ? 0 : currentMovieId - 1;
        this.setState({
          currentMovieId: nextMovieId
        });
        break;
      case 'Enter':
        this.setState({
          currentNavigationMode: 'MOVIE_INFO'
        }, () => {
          this.moviesAppRef.current.style.left = '-40%';
        });
        break;
      default:
        break;
    }
  }

  moviesInfoNavigationHandler(code) {
    const { currentMovieInfoButton } = this.state;
    let nextMovieInfoButton;
    switch (code) {
      case 'ArrowRight':
        nextMovieInfoButton = ( currentMovieInfoButton > 1 ) ? currentMovieInfoButton : currentMovieInfoButton + 1;
        this.setState({
          currentMovieInfoButton: nextMovieInfoButton
        });
        break;
      case 'ArrowLeft':
        nextMovieInfoButton = ( currentMovieInfoButton < 1 ) ? 0 : currentMovieInfoButton - 1;
        this.setState({
          currentMovieInfoButton: nextMovieInfoButton
        });
        break;
      default:
        break;
    }
  }

  navigationHandler = e => {
    e.preventDefault();

    const { currentNavigationMode }  = this.state;
    const currentNavigationModeId  = this.NAVIGATION_MODES.indexOf(currentNavigationMode);

    // Handle back button
    switch (e.code) {
      case 'KeyB':
        this.setState({
          currentNavigationMode: currentNavigationModeId === 0 ? this.NAVIGATION_MODES[0] : this.NAVIGATION_MODES[currentNavigationModeId - 1],
          currentMovieId: 0,
          currentMovieInfoButton: 0
        }, () => {
          this.moviesAppRef.current.style.left = '0';
        });
        break;
      default:
        break;
    }

    // Handle different arrow keys navigation across screens
    switch (this.state.currentNavigationMode) {
      case 'CATEGORY':
        this.categoryNavigationHandler(e.code);
        break;
      case 'MOVIES_LIST':
        this.moviesListNavigationHandler(e.code);
        break;
      case 'MOVIE_INFO':
        this.moviesInfoNavigationHandler(e.code);
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/roman-curse/videoJson/master/videoJson.json')
        .then(response => response.json())
        .then(data => this.prepareData(data));

    window.addEventListener("keydown", this.navigationHandler);
  }

  render() {
    return (
        <div className="App">
          <Header/>
          <div className="MoviesApp" ref={this.moviesAppRef}>
            <CategoriesList categories={this.state.categories} currentCategory={this.state.currentCategory} currentNavigationMode={this.state.currentNavigationMode}/>
            <MoviesCardsList movies={this.getCurrentMoviesList()} currentMovieId={this.state.currentMovieId} currentNavigationMode={this.state.currentNavigationMode}/>
          </div>
          {this.state.currentNavigationMode === 'MOVIE_INFO' && <MovieInfo movie={this.getCurrentMovie()} currentMovieInfoButton={this.state.currentMovieInfoButton}/>}
        </div>
    );
  }
}

export default App;
