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
    .controller( 'categoriasCreateCtrl' , categoriasCreateCtrl );

categoriasCreateCtrl.$inject = [ '$state' , '$scope' , 'galeriaServices' ];

function categoriasCreateCtrl( $state , $scope , galeriaServices ) {

    var categoria            = this;
    categoria.datos_form     = {};

    categoria.agregar = function( ) {

        categoria.datos_form.nombre             = categoria.nombre_categoria;
        categoria.datos_form.descripcion        = categoria.descripcion_categoria;
        console.log(categoria.datos_form);

        galeriaServices.agregar_categoria( {categoria:categoria.datos_form} ,
            function( data ) {
                swal("Guardado!", "Se ha guardado correctamente la informacion!", "success");
                $state.go( 'admin.galeria_cms.categorias' );
            }, function( data ) {
                console.log( data.message );
            }
        );
    };

};
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
    .controller( 'CategoriasListCtrl' , CategoriasListCtrl );

CategoriasListCtrl.$inject = [ '$state' , '$scope' , 'galeriaServices' ];

function CategoriasListCtrl( $state , $scope , galeriaServices ) {

    var categoria           = this;
    categoria.categorias    = [];

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
    categoria.listar = function( ) {
        galeriaServices.mostrar(
            function( data ) {
                console.log( data.response );
                if( data.response.length > 0 ) {
                    categoria.categorias    = data.response;
                    $scope.$parent.noCargar = false;
                }
            }
        );
    }

    categoria.listar();
    $('.collapsible').collapsible({
        accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
};