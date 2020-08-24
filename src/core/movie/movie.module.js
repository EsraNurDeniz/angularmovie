import factory from './movie.service';

const movieModule = angular
    .module('movie', [])
    .factory('movieFactory', factory);


export default movieModule.name;