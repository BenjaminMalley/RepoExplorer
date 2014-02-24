describe('Resources', function() {
  var $httpBackend;

  beforeEach(angular.mock.module('app'));

  beforeEach(function() {
    inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
    });
  });

  describe('Repos', function() {
    var Repos;

    beforeEach(function() {
      inject(function($injector) {
        Repos = $injector.get('Repos');
      });
    });

    describe('query', function() {
      it('should submit requests to the appropriate URL', function() {
        $httpBackend.expectGET('/api/orgs/FooBar/repos?per_page=100').respond(200, "");
        Repos.query({
          org: 'FooBar',
        });
        $httpBackend.flush();
      });

      it('should allow default params to be overridden', function() {
        $httpBackend.expectGET('/api/orgs/FooBar/repos?per_page=20').respond(200, "");
        Repos.query({
          org: 'FooBar',
          per_page: 20,
        });
        $httpBackend.flush();
      });
    });

    describe('get', function() {
      it('should submit requests to the appropriate URL', function() {
        $httpBackend.expectGET('/api/repos/FooBar/RepoA').respond(200, "");
        Repos.get({
          org: 'FooBar',
          name: 'RepoA',
        });
        $httpBackend.flush();
      });
    });
  });

  describe('Commits', function() {
    var Commits;

    beforeEach(function() {
      inject(function($injector) {
        Commits = $injector.get('Commits');
      });
    });

    describe('query', function() {
      it('should submit requests to the appropriate URL', function() {
        $httpBackend.expectGET('/api/repos/FooBar/RepoA/commits?per_page=100').respond(200, "");
        Commits.query({
          owner: 'FooBar',
          repo: 'RepoA',
        });
        $httpBackend.flush();
      });

      it('should allow the default parameters to be overwritten', function() {
        $httpBackend.expectGET('/api/repos/FooBar/RepoA/commits?per_page=20').respond(200, "");
        Commits.query({
          owner: 'FooBar',
          repo: 'RepoA',
          per_page: 20,
        });
        $httpBackend.flush();
      });
    });

    describe('get', function() {
      it('should submit requests to the appropriate URL', function() {
        $httpBackend.expectGET('/api/repos/FooBar/RepoA/commits/1').respond(200, "");
        Commits.get({
          owner: 'FooBar',
          repo: 'RepoA',
          id: 1,
        });
        $httpBackend.flush();
      });
    });
  });
});
