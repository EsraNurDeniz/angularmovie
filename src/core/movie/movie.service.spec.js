import './movie.module';

describe('movie service', () => {
    let httpBackend;
    let service;
    let moviesData = [
        {
            id: 1,
            name: 'Lord of the Rings',
            year: 2002,
        },
        {
            id: 2,
            name: 'Caribbean Pirates',
            year: 2005,
        }

    ];

    beforeEach(angular.mock.module('movie'));

    beforeEach(
        angular.mock.inject(
            /* @ngInject */ (MovieService, $httpBackend) => {
                service = MovieService;
                httpBackend = $httpBackend;
                httpBackend.whenGET('https://localhost:5001/api/MovieItems').respond(moviesData);
            }       
        )
    );

    afterEach( () => {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should fetch the movies data from http request', () => {
        let movies = service.movies();
        httpBackend.flush();
        movies.then((response) => {
            expect(response.data.length).toBe(2);
        });
    });
});