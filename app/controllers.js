angular.module('app')

.controller("MainCtrl", ['$rootScope', '$location', function($rootScope, $location) {
}])

.controller("ReposCtrl", ['$scope', '$route', 'repos', function($scope, $route, repos) {
  $scope.org = $route.current.params.org;
  $scope.repos = repos;
  $scope.sortKey = 'name';
  $scope.setSortKey = function(id) {
    if ($scope.sortFields.some(function(field) { return field.id == id; })) {
      $scope.sortKey = id;
      return true;
    } else {
      return false;
    }
  };
  $scope.sortFields = [
    { id: "name", name: "Name" },
    { id: "forks_count", name: "Forks" },
    { id: "watchers", name: "Watchers" },
    { id: "size", name: "Size" },
  ];
}])

.controller("CommitsCtrl", ['$scope', '$route', 'commits', function($scope, $route, commits) {
  $scope.repo = $route.current.params.repo;
  $scope.commits = commits;
}]);
