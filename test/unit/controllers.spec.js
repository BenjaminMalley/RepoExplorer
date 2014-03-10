describe('Controllers', function() {

  beforeEach(angular.mock.module('app'));

  describe('ReposCtrl', function() {
    var repos,
        scope,
        ctrl,
        route;

    beforeEach(function() {
      repos = [
        {
          name: "RepoC",
          forks_count: 1,
          watchers: 2,
          size: 3,
        },
        {
          name: "RepoB",
          forks_count: 3,
          watchers: 2,
          size: 1,
        },
        {
          name: "RepoA",
          forks_count: 2,
          watchers: 1,
          size: 3,
        },
        {
          name: "RepoD",
          forks_count: 2,
          watchers: 3,
          size: 1,
        },
      ];

      scope = {};

      route = {
        current: {
          params: {
            org: "FooBar",
          },
        },
      };
    });

    beforeEach(angular.mock.inject(function($controller) {
      ctrl = $controller('ReposCtrl', {
        $scope: scope,
        $route: route,
        repos: repos,
      });
    }));

    it('should load the repos resource into the current scope', function() {
      expect(scope.repos).toEqual(repos);
    });

    it('should create sort fields for sorting repos', function() {
      expect(scope.sortFields.length).toBe(6);
    });

    it('should sort the repos by name by default', function() {
      expect(scope.sortKey).toBe('name');
    });

    it('should get the organization name from the current route and provide it to the scope', function() {
      expect(scope.org).toEqual(route.current.params.org);
    });

    describe('setSortKey', function() {
      it('should change the sorting key when a valid key is used', function() {
        expect(scope.setSortKey('forks_count')).toBe(true);
        expect(scope.sortKey).toBe('forks_count');
      });

      it('should not change the sorting key when an invalid key is used', function() {
        expect(scope.setSortKey('foo')).toBe(false);
        expect(scope.sortKey).toBe('name');
      });

      it('should set $scope.reverse to false when called with a new sortKey', function() {
        scope.reverse = true;
        scope.setSortKey('forks_count');
        scope.setSortKey('name');
        expect(scope.reverse).toBe(false);
      });

      it('should flip $scope.reverse when called with the value of $scope.sortKey', function() {
        scope.setSortKey('name');
        var pre = scope.reverse; // value of reverse after first call
        scope.setSortKey('name');
        expect(scope.reverse).toBe(!pre); // expect scope.reverse == !pre
      })
    });
  });

  describe('CommitsCtrl', function() {
    var commits,
        scope,
        route,
        ctrl;

    beforeEach(function() {
      commits = [
        {
          commit: {
            sha: 'fake digest',
            author: { name: "Benjamin Malley", date: "2014-01-01T00:00:01Z"},
            message: "initial commit",
          },
        },
        {
          commit: {
            sha: 'fake digest',
            author: { name: 'Benjamin Malley', date: '2014-01-01T00:00:02Z'},
            message: '[WIP] rewrite in Haskell',
          },
        },
        {
          commit: {
            sha: 'fake digest',
            author: { name: 'Benjamin Malley', date: '2014-01-01T00:00:03Z'},
            message: '[WIP] rewrite in COBOL',
          },
        },
      ];

      scope = {};

      route = {
        current: {
          params: {
            repo: "RepoA",
          },
        },
      };
    });

    beforeEach(angular.mock.inject(function($controller) {
      ctrl = $controller('CommitsCtrl', {
        $scope: scope,
        $route: route,
        commits: commits,
      });
    }));

    it('should load the commits resource into the current scope', function() {
      expect(scope.commits).toEqual(commits);
    });

    it('should load the current repo from the route into the current scope', function() {
      expect(scope.repo).toEqual(route.current.params.repo);
    });
  });
});
