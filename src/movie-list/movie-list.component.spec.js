import '../slider.module';

describe('Unit testing slide deck controller', () => {
  beforeEach(angular.mock.module('slider'));
  describe('SlideDeckController', () => {
    let ctrl;
    let _$compile;
    let _$rootScope;

    // eslint-disable-next-line max-len
    beforeEach(angular.mock.inject(
      /* @ngInject */($rootScope, $componentController, $compile) => {
      _$compile = $compile;
      _$rootScope = $rootScope.$new();
      ctrl = $componentController('slideDeck', { $scope: _$rootScope });
    }));

    it('expect to call next() for autoplay', 
      angular.mock.inject(
        /* @ngInject */ ($interval, $componentController) => {
            const $intervalSpy = jasmine.createSpy('$interval', $interval).and.callThrough();
            const deckCtrl = $componentController('slideDeck', {
                $scope: _$rootScope,
                $interval: $intervalSpy,
            });

            expect($intervalSpy).not.toHaveBeenCalled();
            deckCtrl.playAuto();
            expect($intervalSpy).toHaveBeenCalledWith(deckCtrl.next, 1000);

            spyOn($intervalSpy, 'cancel');
            deckCtrl.playAuto();
            expect($intervalSpy.cancel).toHaveBeenCalled();
        },
      ),
    );

    it('expect to see the content of ng-transclude', () => {
      const element = _$compile('<slide-deck><slide>1</slide></slide-deck>')(_$rootScope);
      expect(element.html()).toContain('1');
    });

    it('expect to see length of added slides', () => {
      const element = _$compile('<slide-deck><slide>1</slide><slide>2</slide><slide>3</slide></slide-deck>')(_$rootScope);
      _$rootScope.$digest();
      const slides = element[0].querySelectorAll(".slide");
      expect(slides.length).toBe(3);
    });

    it('expect to see length of hidden slides', () => {
      const element = _$compile('<slide-deck><slide>1</slide><slide>2</slide><slide>3</slide></slide-deck>')(_$rootScope);
      _$rootScope.$digest();
      const hidden = element[0].querySelectorAll("div[class='slide ng-hide']");
      expect(hidden.length).toBe(2);
    });

    it('expect to see next button and prev button changes isisSelected property', () => {
      const element = _$compile('<slide-deck><slide>1</slide><slide>2</slide><slide>3</slide></slide-deck>')(_$rootScope);
      _$rootScope.$digest();
      element[0].querySelector("[id='nextButton']").click();
      _$rootScope.$digest();
      const slideDeckcont = angular.element(element[0]).controller('slide-deck');
      console.log( _$rootScope.currentSlide);
      expect(slideDeckcont.slides[0].isSelected).toBe(false);
      expect(slideDeckcont.slides[1].isSelected).toBe(true);

      element[0].querySelector("[id='prevButton']").click();
      expect(slideDeckcont.slides[0].isSelected).toBe(true);
      expect(slideDeckcont.slides[1].isSelected).toBe(false);
    });

    it('expect to see isSelected property should be true just for one slide', () => {
      const element = _$compile('<slide-deck><slide>1</slide><slide>2</slide><slide>3</slide></slide-deck>')(_$rootScope);
      _$rootScope.$digest();
      element[0].querySelector("[id='nextButton']").click();
      _$rootScope.$digest();
      const slideDeckcont = angular.element(element[0]).controller('slide-deck');
      expect(slideDeckcont.slides[0].isSelected).toBe(false);
      expect(slideDeckcont.slides[1].isSelected).toBe(true);
      expect(slideDeckcont.slides[2].isSelected).toBe(false);
    });

    it('expect to see currentSlide property changes with next and prev buttons', () => {
      const element = _$compile('<slide-deck><slide>1</slide><slide>2</slide>></slide-deck>')(_$rootScope);
      _$rootScope.$digest();
      element[0].querySelector("[id='nextButton']").click();
      _$rootScope.$digest();
      const slideDeckcont = angular.element(element[0]).controller('slide-deck');
      expect(slideDeckcont.currentSlide).toBe(1);
      
      element[0].querySelector("[id='nextButton']").click();
      _$rootScope.$digest();
      expect(slideDeckcont.currentSlide).toBe(0);

      element[0].querySelector("[id='prevButton']").click();
      _$rootScope.$digest();
      expect(slideDeckcont.currentSlide).toBe(1);
      
    });
  });
});

