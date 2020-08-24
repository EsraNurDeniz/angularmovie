import angular from 'angular';
import movieService from "./movie";

const coreModule = angular.module('core', [movieService]);

export default coreModule.name;
