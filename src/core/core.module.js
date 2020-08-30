import angular from 'angular';
import movieModule from "./movie/movie.module";

const coreModule = angular.module('core', [movieModule]);

export default coreModule.name;
