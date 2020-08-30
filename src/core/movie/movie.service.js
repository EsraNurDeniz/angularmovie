class MovieService {
    constructor($http) {
        this.$http = $http;
    }

    movies() {
        return this.$http.get('https://localhost:5001/api/MovieItems');
    }
}
export default ['$http', MovieService];

