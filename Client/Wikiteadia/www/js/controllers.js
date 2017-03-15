angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('TodoCtrl', function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {
  // A utility function for creating a new projectString
  // with the given projectTitle
  var createProject = function (projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length - 1);
  }

  // Load or initialize projects
  $scope.projects = Projects.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project ****** Try to make this into a Modal as opposed to a "prompt"!!!!!!!!!!
  $scope.newProject = function () {
    console.log('clicked');
    $scope.projectModal.show();
    // var projectTitle = prompt('Project name');
    // if(projectTitle) {
    //   createProject(projectTitle);
    // }
  };

  // called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  // Create our Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;

  }, {
    scope: $scope
  });

  $ionicModal.fromTemplateUrl('new-project.html', function(modal) {
    $scope.projectModal = modal;

  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
//Creating another modal for projects
// $scope.newProject = function() {
//   console.log('clicked');
//   $scope.projectModal.show();
// }




//Creating a second modal
  $scope.activeProject.tasks.push({
    title: task.title
  });
  $scope.taskModal.hide();
  // Inefficient, but saves all the projects
  Projects.save($scope.projects);

  task.title = "";

};

$scope.newTask = function() {
  $scope.taskModal.show();
};

$scope.closeNewTask = function() {
  $scope.taskModal.hide();
};

$scope.toggleProjects = function () {
  $ionicSideMenuDelegate.toggleLeft();
};



})
