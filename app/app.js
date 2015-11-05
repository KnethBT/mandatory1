/**
 * Created by KennethBovbjerg on 04-11-2015.
 */
(function ()
{
   angular.module('BrokerCase', ['ui.router', 'ngFileUpload'])
       .config(function ($stateProvider)
       {
          $stateProvider.state('signUp',
          {
             url: "/signup",
             templateUrl: "app/signup/signup.html",
             controller: "SignUpController"

          }).state('editProfile',
          {
              url: "/edit-profile",
              templateUrl: "app/profile/edit-profile-view.html",
              controller: "EditProfileController"
          })
       })
}());