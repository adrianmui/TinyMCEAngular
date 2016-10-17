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
    var id;
    console.log("prev id is: ", $scope.previousId);
      if($scope.previousId) {
        var nested_targ = event.target;
        while (!nested_targ.class && (nested_targ.class !== "textable" )) {
          if (nested_targ.id) {
            id = nested_targ.id;
            break;
          } 
          nested_targ = angular.element(nested_targ).parent()[0];
        }
        // if (!event.target.id) {

        //   //*incase of nested 
        //   if (angular.element(event.target).parent()[0].id.length === 0) {
        //     id = angular.element(event.target).parent().parent()[0].id;
        //   }  else {
        //     id = angular.element(event.target).parent()[0].id;
        //     $scope.previousId = id;
        //   }
        // } else {
        //   id = event.target.id;
        //   $scope.previousId = id;
        // }
      } else {
        id = event.target.id;
        $scope.previousId = id;
      }
    console.log("curr id is: ", $scope.previousId);

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