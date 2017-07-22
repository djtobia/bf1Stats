/**
 * Created by Dylan on 7/21/2017.
 */
var app = angular.module("bf1Stats", ["angularSpinner"]);

app.controller("statsController", function ($scope, $http, usSpinnerService, statsService) {
    $scope.username;
    $scope.platform = "3";
    $scope.errorMessage;
    $scope.userInfo;

    //spinner functions
    $scope.startSpin = function () {
        usSpinnerService.spin("loadSpinner");
        $scope.isLoading = true;
    }

    $scope.stopSpin = function () {
        usSpinnerService.stop("loadSpinner");
        $scope.isLoading = false;
    }
    $scope.getUserInfo = function () {
        var platform;
        if ($scope.username == "" || $scope.username == null) {
            $scope.errorMessage = "You must enter a username to get stats.";
            return;
        }
        else
            $scope.errorMessage = null;

        $scope.startSpin();
        statsService.getUserInfo($scope.username, $scope.platform).then(function success(response) {
            console.log(response.data);
            $scope.username = null;
            $scope.displayName = response.data.profile.displayName;
            $scope.userInfo = response.data.result;
            console.log($scope.userInfo);
        }, function error(response) {
            console.log(response);
            $scope.userInfo = "something went wrong.";
        });
        var config = {
            data: {username: $scope.username, platform: $scope.platform}
        };

        statsService.getUserWeapons($scope.username, $scope.platform).then(function success(response) {
            console.log(response);
            $scope.weapons = response.data.result;
            console.log($scope.weapons);
            $scope.stopSpin()
        }, function error(response) {
            $scope.stopSpin();
            console.log(response);
            console.log("ERROR");
        });


    }

});

app.service("statsService", function ($http) {

    this.getUserInfo = function (username, platform) {


        var config = {
            data: {username: username, platform: platform}
        };
        return $http.post("/userData", config);
    }

    this.getUserWeapons = function (username, platform) {

        var config = {
            data: {username: username, platform: platform}
        };

        return $http.post("/getUserWeapons", config);
    }

})