describe('Main View', function() {
  beforeEach(function() {
    browser.get('/');
  });

  it('should provide a link the the netflix repos page', function() {
    element(protractor.By.css('[data-purpose="netflix-repos"]')).click().then(function() {
      element(protractor.By.css('[data-purpose="org-title"]')).getText().then(function(text) {
        expect(text.toLowerCase()).toBe("netflix's repositories");
      });
    });
  });
});
