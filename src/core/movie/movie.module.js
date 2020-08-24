import factory from './movie.service';

const movieModule = angular
    .module('core.movie', [])
    .factory('movieFactory', factory);


export default movieModule.name;