/**
 * Created by KennethBovbjerg on 04-11-2015.
 */
(function ()
{
   angular.module('BrokerCase', ['ui.router', 'ngFileUpload'])
       .config(function ($stateProvider, $urlRouterProvider)
       {
           $urlRouterProvider.otherwise('/'); //hvis vi ikke er på en af de andre sider, så gå til denne her

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

          }).state('main',
          {
              url: "/",
              templateUrl: "app/main/main.html",
              controller: "MainController"
          })
       })
}());