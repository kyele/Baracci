angular.module( 'appVestidos' )
    .service('upload', upload );

upload.$inject = [ "$http" , "$q", "routeServices" ]; 
function upload ( $http , $q , routeServices ) {
    this.uploadFile     = function( file , destino ) {
        var path_server = routeServices.PathServer + "index1.php/imagenes/index";
        var deferred    = $q.defer();
        var data        = new FormData();
        data.append( "destino"   , destino );
        data.append( "file"      , file );

        return $http.post( path_server , data , {
            headers: { "Content-type": undefined },
            transformRequest: angular.identity
        })
        .success( function( res ) {
            deferred.resolve( res );
        })
        .error(function( msg , code ) {
            deferred.reject( msg );
        });
        return deferred.promise;
    }   
};