/**
    *   this service allows us to manipulate the customer information
    *   @author     Cesar Herrera <kyele936@gmail.com>
    *   @since      02/10/2015
    *   @version    1
    *   @access     public
    *   @param      Service [$resource]
    *   @param      Service [routeServices]
    *   @return     
    *   @example    catalogosServices.getDep(function(data){.....}
*/
angular.module( 'appVestidos' )
    .service( 'galeriaServices' , galeriaServices );
galeriaServices.$inject = [ '$resource' ]
function galeriaServices( $resource , routeServices ) {

    var galeria_agregar     = $resource( "http://localhost/Baracci/index.php/galeria/index" , {}, {
            agregar: {
                method: 'POST'
            }
        }),
        galeria_list        = $resource( "http://localhost/Baracci/index.php/galeria/index" , {}, {
            listar: {
                method: 'GET'
            }
        }),
        galeria_resource   = $resource( "http://localhost/Baracci/index.php/galeria/find/:id_galeria" , {}, {
            mostrar: {
                method: 'GET',
                params: {
                    id_galeria:    '@id_galeria',
                }
            },
            eliminar: {
                method: 'DELETE',
                params: {
                    id_galeria:    '@id_galeria',
                }
            }
        }),
        galeria_edit  = $resource("http://localhost/Baracci/index.php/galeria/index/:id",{id:"@_id"},{
            modificar: {
                method: "PUT",
                params:{
                    id:"@_id"
                }
            }
        });
        return {
            /**
        *   this function returns the promise that contains a json
        *   @author     Cesar Herrera <kyele936@gmail.com>
        *   @since      09/10/2015
        *   @version    1
        *   @access     public
        *   @param      jsonObject [galeria]
        *   @param      Callbacks [success]
        *   @param      Callbacks [fail]
        *   @return     promise
        *   @example    galeriaServices.agregar( {usuario: 'kyele', nombre: '1414', ....} , function( data ){ .... }, function( data ) { .... } )
        */
        agregar: function( galeria , success, fail ) {
            return galeria_agregar.agregar( galeria ,
                function( data ) {
                    success( data );
                }, function( data ) {
                    fail( data.data );
                }
            );
        },/**
        *   this function returns the promise that contains a json
        *   @author     Cesar Herrera <kyele936@gmail.com>
        *   @since      04/10/2015
        *   @version    1
        *   @access     public
        *   @param      jsonObject [parametros]
        *   @param      Callbacks [callback]
        *   @return     promise
        *   @example    galeriaServices.modificar( datos_galeria , function( data ){ .... });
        */
        modificar: function( id , callback ) {
            return galeria_edit.modificar(
                {
                    id : id ,
                } ,
                function( data ) {
                    callback( data );
                }
            );
        },

        /**
        *   this function returns the promise that contains a json
        *   @author     Cesar Herrera <kyele936@gmail.com>
        *   @since      13/10/2015
        *   @version    1
        *   @access     public
        *   @param      jsonObject [galeria]
        *   @param      Callbacks [success]
        *   @param      Callbacks [fail]
        *   @return     promise
        *   @example    galeriaServices.agregar( {usuario: 'kyele', nombre: '1414', ....} , function( data ){ .... }, function( data ) { .... } )
        */
        listar: function( callback ) {
            return galeria_list.listar(
                function( data ) {
                    callback( data );
                }
            );
        },
        /**
        *   this function returns the promise that contains a json
        *   @author     Cesar Herrera <kyele936@gmail.com>
        *   @since      13/10/2015
        *   @version    1
        *   @access     public
        *   @param      jsonObject [parametros]
        *   @param      Callbacks [callback]
        *   @return     promise
        *   @example    galeriaServices.mostrar( datos_galeria , function( data ){ .... });
        */
        mostrar: function( id_galeria , callback ) {
            return galeria_resource.mostrar(
                {
                    id_galeria: id_galeria,
                } ,
                function( data ) {
                    callback( data );
                }
            );
        },
        /**
        *   this function returns the promise that contains a json
        *   @author     Cesar Herrera <kyele936@gmail.com>
        *   @since      13/10/2015
        *   @version    1
        *   @access     public
        *   @param      jsonObject [parametros]
        *   @param      Callbacks [callback]
        *   @return     promise
        *   @example    galeriaServices.eliminar( datos_galeria , function( data ){ .... });
        */
        eliminar: function( id_galeria , success , fail ) {
            return galeria_resource.eliminar(
                {
                    id_galeria: id_galeria,
                },
                function( data ) {
                    success( data );
                }, function( data ) {
                    fail( data.data );
                }
            );
        },

        /**
        *   this function returns the promise that contains a json
        *   @author     Cesar Herrera <kyele936@gmail.com>
        *   @since      13/10/2015
        *   @version    1
        *   @access     public
        *   @param      jsonObject [parametros]
        *   @param      Callbacks [callback]
        *   @return     promise
        *   @example    galeriaServices.recuperar( datos_galeria , function( data ){ .... });
        */
        recuperar: function( id_galeria , success, fail ) {
            return galeria_recuperar.recuperar(
                {
                    id_galeria: id_galeria,
                },
                function( data ) {
                    success( data );
                }, function( data ) {
                    fail( data.data );
                }
            );
        },
    };
};