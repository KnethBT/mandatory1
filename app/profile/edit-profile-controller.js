/**
 * Created by KennethBovbjerg on 04-11-2015.
 */
(function(){
   angular.module('BrokerCase').controller('EditProfileController',['Upload', '$scope','$state','$http',
       function (upload, $scope, $state, $http)
       {
            $scope.user = JSON.parse(localstorage['User-Data']) || undefined;

            $scope.$watch(function ()
            {
             return $scope.file
            }, function ()
                {
                    $scope.upload($scope.file);
                });


                $scope.upload = function(file)
                {
                    if (file) //Hvis bruger uploader en file
                    {
                        upload.upload({
                            url:'api/profile/edit',
                            method: 'POST',
                            data: {userId: $scope.user._id},
                            file: file
                        }).progress(function(evt)
                        {
                            console.log("firing");

                        }).success(function(data)
                        {

                        }).error(function(error)
                        {
                            console.log(error);
                        })
                    }
                }
       }]);
}());