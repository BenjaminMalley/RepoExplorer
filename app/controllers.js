angular.module('app')

.controller("MainCtrl", ['$rootScope', '$location', function($rootScope, $location) {
}])

.controller("ReposCtrl", ['$scope', '$route', 'repos', function($scope, $route, repos) {
  $scope.org = $route.current.params.org;
  $scope.repos = repos;
  $scope.sortKey = 'name';
  $scope.reverse = false;
  $scope.setSortKey = function(id) {
    //reverse sort direction on repeated clicks of sort field
    $scope.reverse = $scope.sortKey === id ? !$scope.reverse : false;
    if ($scope.sortFields.some(function(field) { return field.id == id; })) {
      $scope.sortKey = id;
      return true;
    } else {
      return false;
    }
  };
  $scope.sortFields = [
    { id: "name", name: "Name" },
    { id: "pushed_at", name: "Last Pushed" },
    { id: "forks_count", name: "Forks" },
    { id: "watchers", name: "Watchers" },
    { id: "open_issues_count", name: "Open Issues" },
    { id: "size", name: "Size" },
  ];
}])

.controller("CommitsCtrl", ['$scope', '$route', 'commits', function($scope, $route, commits) {
  $scope.repo = $route.current.params.repo;
  $scope.commits = commits;
}]);
