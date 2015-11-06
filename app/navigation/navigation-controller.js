/**
 * Created by KennethBovbjerg on 04-11-2015.
 */
(function  ()
{
    angular.module('BrokerCase')
        .controller('NavigationController', ['$scope', '$http', "$state",
                    function($scope, $http, $state)
                    {
                        //Se om brugeren har "user-data" i browseren local storage
                        if (localStorage['User-Data'])
                        {
                            $scope.loggedIn = true; //Hvis de har, så set dem som værende logget ind!
                        }
                        else
                        {
                            $scope.loggedIn = false; //Ellers, så er de logget ud!
                        }

                        $scope.logUserIn = function()
                        {
                            $http.post('api/user/login', $scope.login).success(function(response)
                            {
                                localStorage.setItem('User-Data', JSON.stringify(response));
                                $scope.loggedIn = true;

                            }).error(function (error)
                            {
                                console.error(error);
                            });
                        };


                        $scope.logOut = function ()
                        {
                            localStorage.clear();
                            $scope.loggedIn = false;
                        }
                    }]);
}());