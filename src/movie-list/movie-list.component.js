import template from './movie-list.template.html';
import { HubConnectionBuilder } from '@microsoft/signalr';

export default {
    template,
    controller: /* @ngInject */ function MovieListControler(MovieService) {
        const that = this;
        that.items = [];

        that.getMovies = () => 
        {
            return MovieService.movies();
        }

        that.listMovies = () =>
        {
            const list = that.getMovies();
            list.then((response) => {
                console.log("deniz:  " + response.data);
                that.items = response.data;
                console.log(response.data);
            });
        }

        that.$onInit = () => {
            that.listMovies();
        }

        const API_URL = 'http://localhost:5000';
        const connection = new HubConnectionBuilder()
            .withUrl(API_URL + '/movieHub')
            .build();

            connection.start().then(() => {
                console.log('signalr bağlantısı sağlandı.');
            })

            connection.on('GetData', data => {
                console.log('GetData tetiklendi.');
                that.listMovies();
            })
    },
}