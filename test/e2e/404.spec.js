describe('404', function() {
  beforeEach(function() {
    browser.get('/a/bad/url');
  });

  it('should redirect to the 404 page', function() {
    expect(element.all(protractor.By.css('[data-purpose="lost"]')).count()).toBe(1);
  });
});
