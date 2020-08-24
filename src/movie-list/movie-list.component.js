import template from './movie-list.template.html';
import { HubConnectionBuilder } from '@microsoft/signalr';

export default {
    template,
    controller: /* @ngInject */ function MovieListControler(movieFactory) {
        const that = this;
        that.items = [];

        that.getMovies = () => 
        {
            return movieFactory.movies();
        }

        that.listMovies = () =>
        {
            const list = that.getMovies();
            list.then((response) => {
                console.log(response.data);
                that.items = response.data;
                //that.items[0].poster = that.items[0].poster.toString();
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