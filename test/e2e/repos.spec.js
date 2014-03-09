describe('Repos View', function() {
  beforeEach(function() {
    browser.get('/orgs/netflix/repos');
  });

  it('should display the repositories in alphabetical order by name', function() {
    element.all(protractor.By.css('[data-purpose="repo-name"]')).map(function(elem) {
      return elem.getText();
    }).then(function(names) {
      // normalize repo names to lower case and use orthographic comparison
      expect(!!names.reduce(function(a, b) { return a.toLowerCase() <= b.toLowerCase() ? b : false; })).toBe(true);
    });
  });

  it('should reverse the direction of order when Name is clicked', function() {
    element(protractor.By.css('[data-purpose="sort-by-name"]')).click().then(function() {
      element.all(protractor.By.css('[data-purpose="repo-name"]')).map(function(elem) {
        return elem.getText();
      }).then(function(names) {
        expect(!!names.reduce(function(a, b) { return a.toLowerCase() >= b.toLowerCase() ? b : false; })).toBe(true);
      });
    });
  });

  it('should change the ordering when a different sort key is clicked', function() {
    element(protractor.By.css('[data-purpose="sort-by-size"]')).click().then(function() {
      element.all(protractor.By.css('[data-purpose="repo-size"]')).map(function(elem) {
        return elem.getText();
      }).then(function(sizes) {
        expect(!!sizes.reduce(function(a, b) { return parseInt(a) <= parseInt(b) ? b : false; })).toBe(true);
      });
    });
  });

  it('should filter the list of repos according to the search text', function() {
    element(protractor.By.css('[data-purpose="filter-repos"]')).sendKeys('aminator').then(function() {
      expect(element.all(protractor.By.css('[data-purpose="repo-name"]')).count()).toBe(1);
    });
  });

  it('should add the has-error class to the search field when there is no matching repo', function() {
    element(protractor.By.css('[data-purpose="filter-repos"]')).sendKeys('zzzzzzzzzzz').then(function() {
      expect(element.all(protractor.By.css('[data-purpose="repo-name"]')).count()).toBe(0);
      expect(element(protractor.By.css('[data-purpose="validator"]')).getAttribute('class')).toMatch('has-error');
    });
  });

  it('should link to the commits pages for the repos displayed', function() {
    // click on the first commits link and verify that we routed to a valid commits page
    element(protractor.By.css('[data-purpose="repo-name"] a')).click().then(function() {
      expect(element.all(protractor.By.css('[data-purpose="commits-filter"]')).count()).toBe(1);
    });
  });
});
