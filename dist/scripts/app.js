(function() {

    function config($stateProvider, $locationProvider) {
        
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });
        $stateProvider
            .state('landing', {
                url: '/',
                templateUrl: '/templates/landing.html',
                controller: 'LandingCtrl as landing'
            })
            .state('album', {
                url: '/album',
                templateUrl: '/templates/album.html',
                controller: 'AlbumCtrl as album'
            })
            .state('collection', {
                url: '/collection',
                templateUrl: '/templates/collection.html',
                controller: 'CollectionCtrl as collection'
            });   
        
    }
    
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
    
})();


