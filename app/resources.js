angular.module('app')

.factory("Repos", ['$resource', function($resource) {
  return $resource('/api/repos/:org/:name', {}, {
    query: {
      url: '/api/orgs/:org/repos',
      method: 'GET',
      isArray: true,
      params: {
        per_page: 100,
      },
    },
  });
}])

.factory("Commits", ['$resource', function($resource) {
  return $resource('/api/repos/:owner/:repo/commits/:id', {}, {
    query: {
      url: '/api/repos/:owner/:repo/commits',
      method: 'GET',
      isArray: true,
      params: {
        per_page: 100,
      },
    },
  });
}]);
