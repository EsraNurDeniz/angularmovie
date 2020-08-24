const factory = /* @ngInject */ ($http) => {
    return {
        movies: () => {
            return $http.get('https://localhost:5001/api/MovieItems');
        },
    };
};

export default factory;

