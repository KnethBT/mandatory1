/**
 * Created by KennethBovbjerg on 04-11-2015.
 */
(function(){
    angular.module('BrokerCase')
        .controller('SignUpController', ['$scope', '$state', '$http',
                    function ($scope, $state, $http)
    {
        $scope.createUser = function(){
            console.log($scope.newUser);
            $http.post('api/user/signup', $scope.newUser).success(function(response){

            }).error(function(error){
                console.log(error);
            })
        }
    }]);
}());