/**
    *   This controller catch the information of the customers
    *   @author     Cesar Herrera <kyele936@gmail.com>
    *   @since      13/02/2015
    *   @version    1
    *   @access     public
    *   @param      Service [$resource]
    *   @param      Service [$location]
    *   @param      Service [routeServices]
    *   @return     
    *   @example    cliente.listar( .... )
*/
angular.module( 'appVestidos' )
    .controller( 'GaleriaListCtrl' , GaleriaListCtrl );

GaleriaListCtrl.$inject = [ '$state' , '$scope' , 'galeriaServices' ];

function GaleriaListCtrl( $state , $scope , galeriaServices ) {

    var galeria = this;
    galeria.galerias     = [];

    /**
    *   This function call data of the customers.
    *   @author     Cesar Herrera <kyele936@gmail.com>
    *   @since      13/29/2015
    *   @version    1
    *   @access     public
    *   @param      galerias.datos_form
    *   @return
    *   @example    galeria.agregar( .... )
    */
    galeria.listar = function( ) {
        galeriaServices.listar(
            function( data ) {
                console.log(data.response);
                if( data.response.length > 0 ) {
                    galeria.galerias = galeria.galerias.concat( data.response );
                    $scope.$parent.noCargar = false;
                }
            }
        );
    }

    galeria.ordenarPor = function(orden) {
        galeria.ordenSeleccionado = orden;
    };

    galeria.listar();
};