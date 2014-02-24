describe('Commits View', function() {
  beforeEach(function() {
    browser.get('/repos/netflix/aminator/commits');
  });

  it('should display the commits ordered by most recent commit', function() {
    element.all(protractor.By.css('[data-purpose="commit-date"]')).map(function(elem) {
      return elem.getText();
    }).then(function(dates) {
      expect(!!dates.reduce(function(a, b) { return Date.parse(a) >= Date.parse(b) ? b : false; })).toBe(true);
    });
  });

  it('should filter the list of commits according to the search text', function() {
    element(protractor.By.css('[data-purpose="commits-filter"]')).sendKeys('Builder').then(function() {
      expect(element.all(protractor.By.css('[data-purpose="commit-date"]')).count()).toBeLessThan(100);
    });
  });

  it('should add the has-error class to the search field when there is no matching commit', function() {
    element(protractor.By.css('[data-purpose="commits-filter"]')).sendKeys('zzzzzzzzzzz').then(function() {
      expect(element.all(protractor.By.css('[data-purpose="commit-date"]')).count()).toBe(0);
      expect(element(protractor.By.css('[data-purpose="validator"]')).getAttribute('class')).toMatch('has-error');
    });
  });
});
