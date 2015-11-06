/**
 * Created by KennethBovbjerg on 04-11-2015.
 */


(function()
{
   angular.module('BrokerCase')
       .controller('EditProfileController',['Upload', '$scope','$state','$http',
       function (upload, $scope, $state, $http)
       {
            $scope.user = JSON.parse(localStorage['User-Data']) || undefined;

            $scope.$watch(function ()
            {
             return $scope.file
            },
            function ()
            {
                $scope.upload($scope.file);
            });


            $scope.upload = function(file)
            {
                if (file) //Hvis brugeren har valgt en fil
                {
                    upload.upload(
                    {
                        url:'api/profile/editPhoto',
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
                        alert(error); //løb tør for tid, normalt vil jeg ikke lave en popup med fejl, men bruge en label eller andet, som er mindre for styrende for brugeren!
                        console.log(error);
                    })
                }
            }

           $scope.updateUsername = function ()
           {
               var request =
               {
                   userId: $scope.user._id,
                   username: $scope.user.username
               }

               $http.post('api/profile/updateUsername', request).success(function()
               {
                   console.log("success");
               }).error(function(error)
               {
                   alert(error); //løb tør for tid, normalt vil jeg ikke lave en popup med fejl, men bruge en label eller andet, som er mindre for styrende for brugeren!
                   console.log("error");
               })
           };

           $scope.updateBio = function ()
           {
               var request =
               {
                   userId: $scope.user._id,
                   bio: $scope.user.bio
               }

               $http.post('api/profile/updateBio', request).success(function()
               {
                   console.log("success")
               }).error(function(error)
               {
                   alert(error); //løb tør for tid, normalt vil jeg ikke lave en popup med fejl, men bruge en label eller andet, som er mindre for styrende for brugeren!
                   console.log(error);
               });
           }



           $scope.getUserData = function()
           {
               var uId = $scope.user._id;

               console.log(uId);

               $http
               ({
                  url: 'api/profile/get',
                   method: "GET",
                   params: {user_id: uId}
               }).then(function successCallback(response)
               {
                   $scope.userImage = response.data.image;
                   $scope.username = response.data.username;
                   $scope.userbio = response.data.bio;
                   console.log(response);

               });


           };

           //Init
          $scope.getUserData();
       }]);


}());