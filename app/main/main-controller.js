/**
 * Created by KennethBovbjerg on 05-11-2015.
 */
(function()
{
    angular.module('BrokerCase')
        .controller('MainController', ['Upload', '$scope', '$http',
            function (upload,  $scope, $http)
            {
                if (localStorage['User-Data'] !== undefined)
                {
                    $scope.user = JSON.parse(localStorage['User-Data']);
                    console.log($scope.user);
                }

                $scope.upload = function(contentImage)
                {
                    if (contentImage) //Hvis brugeren har valgt en fil
                    {
                        upload.upload(
                        {
                            url:'api/content/uploadPhoto',
                            method: 'POST',
                            data: {userId: $scope.user._id},
                            file: contentImage

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

                $scope.sendContent = function(contentImage)
                {
                        $scope.upload(contentImage);
                        console.log(contentImage);

                        var request =
                        {
                            username: $scope.user.username || $scope.user.email,
                            userId: $scope.user._id,
                            contentTitle: $scope.newContentTitle,
                            contentDescription: $scope.newContentDescription,
                            contentImg: "test"
                        }

                        $http.post('api/content/post', request).success(function(response)
                        {
                            console.log(request);
                            $scope.wastes = response;

                        }).error(function(error)
                        {
                            console.error(error);
                        })

                };

            }]);
}());