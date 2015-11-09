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
    .directive( 'uploaderModel' , uploaderModel );
    uploaderModel.$inject = [ '$parse' ];

function uploaderModel( $parse ) {
    return {
        restrict: 'A',
        link: function (scope, iElement, iAttrs) 
        {
            iElement.on("change", function(e)
            {
                $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
            });
        }
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
    .directive( 'imageBoxed' , imageBoxed );
    imageBoxed.$inject = [];

function imageBoxed() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function() {
            $('.materialboxed').materialbox();
        }
    };
};