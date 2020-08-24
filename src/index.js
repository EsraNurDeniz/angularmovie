import angular from 'angular';
import core from './core';
import movieList from './movie-list/movie-list.module';

import './app.css';


angular.module('app', [movieList, core]);
