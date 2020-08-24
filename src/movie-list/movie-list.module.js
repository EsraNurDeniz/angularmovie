import angular from 'angular';
import '@esradeniz/slider';
import movieListComponent from './movie-list.component';

const movieListModule = angular.module('app.movieList', ['slider']);

movieListModule.component('movieList' , movieListComponent);

export default movieListModule.name;