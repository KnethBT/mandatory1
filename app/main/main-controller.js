/**
 * Created by KennethBovbjerg on 05-11-2015.
 */
(function()
{
    angular.module('BrokerCase')
        .controller('MainController', ['Upload', '$scope', '$http', '$interval',
            function (upload,  $scope, $http , $interval)
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

                        var request =
                        {
                            username: $scope.user.username || $scope.user.email,
                            userId: $scope.user._id,
                            contentTitle: $scope.newContentTitle,
                            contentDescription: $scope.newContentDescription,
                            contentImg: contentImage.name
                        }

                        $http.post('api/content/post', request).success(function(response)
                        {
                            console.log(request);
                            $scope.contents = response;

                        }).error(function(error)
                        {
                            console.error(error);
                        })

                };

                //Load content ved start af siden!
                function getContents(initial)
                {
                    $http.get('api/content/get').success(function (response)
                    {
                        if (initial)
                        {
                            $scope.contents = response;
                        }
                        else
                        {
                            if (response.length > $scope.contents.length)
                            {
                                $scope.incomingContents = response;
                            }
                        }
                    })

                };

                $scope.voteContent =function(content, isUpVote)
                {
                   // console.log(content._id);
                    var voteScore = new Number(0);

                    if (isUpVote){voteScore++;}
                    else {voteScore--;}

                    var newScore = content.contentScore + voteScore;

                    console.log("newScore: " + newScore);
                    var request =
                    {
                        contentId: content._id,
                        contentScore: newScore
                    }

                    $http.post('api/content/updateVotes', request).success(function()
                    {
                        console.log("success");
                    }).error(function(error)
                    {
                        console.log("error");
                    })

                    //$scope.setNewContents();
                };



                //Check om der er kommet nyt content vært x sek!
                $interval(function ()
                {
                    getContents(false);
                    if ($scope.incomingContents)
                    {
                        $scope.difference = $scope.incomingContents.length - $scope.contents.length;
                    }


                }, 10000);//Checker for nyt content vært 10sek!

                $scope.setNewContents = function()
                {
                    $scope.contents = angular.copy($scope.incomingContents);
                    $scope.incomingContents = undefined; //Fjerner linket der viser, at der er kommet nyt content!
                }

                //Init
                getContents(true);


                (function ($)
                {

                    $('#filter').keyup(function ()
                    {
                        var rex = new RegExp($(this).val(), 'i');
                        $('.searchable tr').hide();
                        $('.searchable tr').filter(function ()
                        {
                            return rex.test($(this).text());
                        }).show();

                    })

                }(jQuery));

            }]);
}());