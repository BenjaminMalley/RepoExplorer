angular.module('app')

.config(['$routeProvider', '$locationProvider', function(route, location) {
  location.html5Mode(true);

  route.when('/', {
    templateUrl: '/app/views/main.html',
    controller: "MainCtrl",
  })
  .when('/orgs/:org/repos', {
    templateUrl: '/app/views/repos.html',
    controller: "ReposCtrl",
    resolve: {
      repos: ['$route', 'Repos', function($route, Repos) {
        return Repos.query({ org: $route.current.params.org});
      }],
    },
  })
  .when('/repos/:owner/:repo/commits', {
    templateUrl: '/app/views/commits.html',
    controller: "CommitsCtrl",
    resolve: {
      commits: ['$route', 'Commits', function($route, Commits) {
        return Commits.query({
          owner: $route.current.params.owner,
          repo: $route.current.params.repo,
        });
      }],
    },
  })
  .otherwise({
    templateUrl: '/app/views/404.html',
    controller: "MainCtrl",
  });

}]);
