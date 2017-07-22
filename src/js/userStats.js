/**
 * Created by Dylan on 7/21/2017.
 */
var app = angular.module("bf1Stats", []);

app.controller("statsController", function($scope, $http){
   $scope.username;
   $scope.platform="3";
   $scope.errorMessage;
   $scope.userInfo;
   $scope.getUserInfo = function(){
       var platform;
       if($scope.username == "" || $scope.username == null)
       {
           $scope.errorMessage = "You must enter a username to get stats.";
           return;
       }
       else
           $scope.errorMessage = null;

       console.log($scope.platform);

       var config = {
           data: {username: $scope.username, platform: $scope.platform}
       };

       $http.post("/userData",config).then(function success(response){
           console.log(response.data);
           $scope.username = null;
           $scope.displayName = response.data.profile.displayName;
           $scope.userInfo = response.data.result;
           console.log($scope.userInfo);
       }, function error(response){
           console.log(response);
           $scope.userInfo = "something went wrong.";
       });

       $http.post("/getUserWeapons", config).then(function success(response){
           console.log(response);
           $scope.weapons = response.data.result;
           console.log($scope.weapons);
       },function error(response){
           console.log(response);
           console.log("ERROR");
       });


   }

});