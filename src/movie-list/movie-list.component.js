import Template from './movie-list.template.html';
import { HubConnectionBuilder } from '@microsoft/signalr';

class MovieListComponent {
    constructor (MovieService) {
        this.MovieService = MovieService;
        this.items = [];

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

        this.$onInit = () => {
            this.listMovies();
        }
    }

    getMovies () {
        return this.MovieService.movies();
    }

    listMovies () {
        const list = this.getMovies();
        list.then((response) => {
            this.items = response.data;
        });
    }
}

export default {
    controller: ["MovieService", MovieListComponent],
    template : Template
};
    

 