import MovieService from './movie.service';

const movieModule = angular
    .module('movie', [])
    .service('MovieService', MovieService);


export default movieModule.name;