angular.module( 'appVestidos' )
    .service('upload', upload );

upload.$inject = [ "$http" , "$q" ]; 
function upload ( $http , $q ) {
    this.uploadFile     = function( file , destino ) {
        var deferred    = $q.defer();
        var data        = new FormData();
        data.append( "destino"   , destino );
        data.append( "file"      , file );

        return $http.post( "http://localhost/Baracci/index1.php/imagenes/index" , data , {
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