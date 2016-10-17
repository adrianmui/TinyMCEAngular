var myAppModule = angular.module('myApp', ['ui.tinymce']);

myAppModule.controller('TinyMceController', 
  ['$scope', function($scope) {

  $scope.tinymceModel = 'Initial content';

  $scope.previousId;

  //sets a listener to 'textable' class tags
  angular.element('.textable').on('click', function(event) {
    /*edge cases are:
      clicking a box, exiting, and reclicking it should still target the same div.
      clicking another box should successfully target the other box.
    */
      if($scope.previousId) {
        if (event.target.id && $scope.previousId != event.target.id) {
          var id = event.target.id;
          $scope.previousId = id;
        } else {
          var id = $scope.previousId;
        }
      } else {
        var id = event.target.id;
        $scope.previousId = id;
      }

      tinymce.init({
        selector: ('#' + id),
        plugins: 'link image code wordcount',
        toolbar: 'mybutton | myimage | close | undo redo | bold italic | alignleft aligncenter alignright | code',
        menubar: true,
        setup: function (editor) {
          editor.addButton('mybutton', {
            text: 'ClickMe',
            icon: false,
            onclick: function () {
              editor.insertContent('<button class="btn btn-info">DoNothing</button>');
            }
          });
          editor.addButton('close', {
            text: 'Exit',
            icon: false,
            onclick: function() {
              editor.destroy();
            }
          });
          editor.addButton('myimage', {
            text: 'Image',
            icon: false,
            onclick: function() {
              editor.insertContent('<img style="height: 50px" src="https://cdn0.iconfinder.com/data/icons/iconshock_guys/512/andrew.png"></img>');
            }
          });
        },
        content_css: [
          'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.1.1/css/mdb.min.css',
        ]
      });

  })


  /*
  This was the method i started off with, giving each text tag an explicit an ng-click listener. Felt stupid,
  so I resorted to setting a jqlite listener to every textable class.

  $scope.yes = function(event) {

    var id = event.target.id;
    console.log("hi im here, ", id);
    angular.element('#' + id).attr('id', "selected");

    tinymce.init({
      selector: ('#' + id),
      plugins: 'link image code wordcount',
      toolbar: 'mybutton | undo redo | bold italic | alignleft aligncenter alignright | code',
      menubar: true,
      setup: function (editor) {
        editor.addButton('mybutton', {
          text: 'ClickMe',
          icon: false,
          onclick: function () {
            editor.insertContent('<button class="btn btn-info">DoNothing</button>');
          }
        });
      },
      content_css: [
        'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.1.1/css/mdb.min.css',
      ]
    });
  }
  */
}]);