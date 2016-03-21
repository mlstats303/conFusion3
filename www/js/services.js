'use strict';

angular.module('conFusion.services',['ngResource'])
        .constant("baseURL","http://192.168.0.103:3000/")
        .factory('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL + "dishes/:id", null, {
              'update' : {
                  method : 'PUT'
              }
            });
        }])

        .factory('promotionFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL + "promotions/:id");
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"leadership/:id");
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"feedback/:id");
        }])

        .factory('favoriteFactory', ['$resource', 'baseURL','$localStorage', function($resource, baseURL,$localStorage) {
            var favFac = {};
            var favorites = $localStorage.getObject('favorites', null);
            if (favorites == null) {
              favorites = [];
            }

            favFac.addToFavorites = function (index) {
              for (var i = 0; i < favorites.length; i++) {
                if (favorites[i] == index)
                  return;
              }
              favorites.push({id: index});
              console.log("Adding favorite: "  + index.toString());
              $localStorage.storeObject('favorites', favorites);
            };

            favFac.deleteFromFavorites = function (index) {
              for (var i = 0; i < favorites.length; i++) {
                if (favorites[i].id == index) {
                  favorites.splice(i, 1);
                  console.log("Removing favorite: "  + index.toString());
                  $localStorage.storeObject('favorites', favorites);
                }
              }
            };

            favFac.getFavorites = function () {
              return favorites;
            };

            return favFac;

        }])

        .factory('$localStorage', ['$window', function ($window) {
          return {
            store : function(key,value) {
              $window.localStorage[key] = value
            },
            get : function (key, defaultValue) {
              return $window.localStorage[key] || defaultValue;
            },
            storeObject : function (key, value) {
              $window.localStorage[key] = JSON.stringify(value);
            },
            getObject : function (key, defaultValue) {
              return JSON.parse($window.localStorage[key] || defaultValue);
            }
          }
        }])

;
