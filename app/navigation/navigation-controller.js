/**
 * Created by KennethBovbjerg on 04-11-2015.
 */
(function  ()
{
    angular.module('BrokerCase')
        .controller('navigationController', ['$scope', '$http', "$state",
                    function($scope, $http, $state)
                    {
                        $scope.logUserIn = function()
                        {
                            $http.post('api/user/login', $scope.login).success(function(response)
                            {
                                localstorage.setItem('User-data',JSON.stringify(response));
                            }).error(function (error)
                                {
                                    console.error(error);
                                });
                        }
                    }]);
}());