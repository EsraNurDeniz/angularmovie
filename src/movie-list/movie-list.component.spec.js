import './movie-list.module';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

describe('movieList controller', () => {
    let ctrl; 

    beforeEach(
        angular.mock.module(
            'app.movieList', /* @ngInject */ ($provide) => {
                const mockFactory = {
                    movies() {
                        return new Promise((resolve) => {
                            resolve({
                                data: [
                                  {
                                    id: 1,
                                    name: 'V for Vendatta',
                                    year: 1996,
                                  },
                                ],
                              });
                        })
                    },
                };
                $provide.factory('movieFactory', () => {
                    return mockFactory;
                });
            },
        ),
    );
    
    beforeEach(
        angular.mock.inject(
            /* @ngInject */ ($componentController) => {
                ctrl = $componentController('movieList');
            },
        ),
    );

    it('should get the movies', async () => {
        ctrl.getMovies().then((response) => {
            expect(response.data.length).toBe(1);
          });
          await ctrl.listMovies();
          expect(ctrl.items.length).toBe(1);
    });
});
