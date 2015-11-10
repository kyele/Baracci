/**
    *   This servicio extrae la ruta del servidor.
    *   @author     Christian Velázquez <chris.abimael93@gmail.com>
    *   @since      02/08/2015
    *   @version    1
    *   @access     public
    *   @param      Service [$resource]
    *   @param      Service [routeServices]
    *   @return     
    *   @example    sessionServices.getDep(function(data){.....}
*/
angular.module('appVestidos')
    .service('routeServices', routeServices );

routeServices.$inject = [ '$location' ];

function routeServices( $location ) {

    var path_angular, path_server;
    path_angular = $location.absUrl();
    path_server = path_angular.substring( 0, path_angular.indexOf('index.html') != -1? path_angular.indexOf('index.html'):path_angular.indexOf('#'));

    this.PathServer = path_server;
};