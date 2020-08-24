'use strict';

const { by, element, browser } = require('protractor');

describe('SlideDeck Application', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it('should create slides ', function() {
    element.all(by.css('.slide')).then((slides) => {
      expect(slides.length).toBe(6);
    });
  });

  it('should click next button,go to next slide', function() {
    element.all(by.css('.slide')).then((slides) => {
      expect(hasClass(slides[0], 'ng-hide')).toBe(false);
      for(let i = 1; i < slides.lenth; i++) {
        expect(hasClass(slides[i], 'ng-hide')).toBe(true);
      }
    });

    const nextSlide = element(by.id('nextButton'));
    nextSlide.click();

    element.all(by.css('.slide')).then((slides) => {
      expect(hasClass(slides[1], 'ng-hide')).toBe(false);
      for(let i = 0; i < slides.lenth; i++) {
        if(i != 1) {
          expect(hasClass(slides[i], 'ng-hide')).toBe(true);
        }
      }
    });
  });

  it('should click prev button,go to prev slide', function() {
    element.all(by.css('.slide')).then((slides) => {
      expect(hasClass(slides[0], 'ng-hide')).toBe(false);
      for(let i = 1; i < slides.lenth; i++) {
        expect(hasClass(slides[i], 'ng-hide')).toBe(true);
      }
    });

    const prevSlide = element(by.id('prevButton'));
    prevSlide.click();

    element.all(by.css('.slide')).then((slides) => {
      expect(hasClass(slides[slides.length -1], 'ng-hide')).toBe(false);
      for(let i = 0; i < slides.lenth; i++) {
        if(i != slides.length -1) {
          expect(hasClass(slides[i], 'ng-hide')).toBe(true);
        }
      }
    });

  });


});

const hasClass = function (element, cls) {
  return element.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
  });
};

