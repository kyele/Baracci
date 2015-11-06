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

    var galeria         = this;
    galeria.galerias    = [];

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
                //console.log(data.response);
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
    .controller( 'ProductosCreateCtrl' , ProductosCreateCtrl );

ProductosCreateCtrl.$inject = [ '$state' , '$scope' , 'galeriaServices' , 'upload' ];

function ProductosCreateCtrl( $state , $scope , galeriaServices , upload ) {

    var producto            = this;
    producto.productos      = [];
    producto.categorias     = [];
    producto.imagen_destino = 'images/galeria/';

    var datos               = {};
    datos.datos_form        = {};
    

    producto.uploadFile = function( ) {

        datos.datos_form.nombre             = producto.nombre_producto;
        datos.datos_form.material           = producto.material_producto;
        datos.datos_form.descripcion        = producto.descripcion_producto;
        datos.datos_form.url_imagen         = producto.imagen_destino+producto.image_name;
        datos.datos_form.categorias         = [];
        datos.datos_form.categorias         = datos.datos_form.categorias.concat( producto.categorias );
        var file                            = producto.file;

        galeriaServices.agregar_producto( {producto:datos.datos_form} ,
            function( data ) {
                console.log(data);
                
                swal("Guardado!", "Se ha guardado correctamente la informacion!", "success");
                $state.go( 'admin.galeria_cms.productos' );
            }, function( data ) {
                //console.log( data.message );
            }
        );
        upload.uploadFile( file , producto.imagen_destino ).then(function(res)
        {
            swal("Guardado!", "Se ha guardado correctamente la informacion!", "success");
            $state.go( 'admin.galeria_cms.productos' );
        })
    };

    producto.agrega_categoria = function( id_categoria ) {
        indice = producto.categorias.indexOf( id_categoria );
        if ( indice != (-1) ) {
            producto.categorias.splice( indice , 1 )
        } else {
            producto.categorias.push( id_categoria );
        }
    }
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
    producto.listar = function( ) {
        galeriaServices.mostrar(
            function( data ) {
                if( data.response.length > 0 ) {
                    producto.productos    = data.response;
                    $scope.$parent.noCargar = false;
                }
            }
        );
    }

    $("#file").on("change", function() {
        var image = new Image();
        $("#vista_previa").html('');
        var archivos    = document.getElementById('file').files;
        var navegador   = window.URL || window.webkitURL;

        for( var x = 0; x < archivos.length ; x++ ) {
            var size = archivos[x].size;
            var type = archivos[x].type;
            var name = archivos[x].name;
            producto.image_name = archivos[x].name;
            if(size > 1024 * 1024) {
                $("#vista_previa").append("<p style='color: red'> El archivo"+name+" supera el tamaño maximo permitido (1MB)</p>");
            } else if( type != 'image/jpg' && type != 'image/jpeg' && type != 'image/png' && type != 'image/gif' ) {
                $("#vista_previa").append("<p style='color: red'> El archivo"+name+" no es un archivo permitido (jpg, jpeg, png, gif)</p>");
            } else {
                var objeto_url = window.URL.createObjectURL(archivos[x]);
                $("#vista_previa").append("<img src="+objeto_url+" width='250' height='250'>"); 
            }
        }
    })

    producto.listar();

    $('.collapsible').collapsible({
        accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
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
        .success(function(res)
        {
            deferred.resolve(res);
        })
        .error(function(msg, code)
        {
            deferred.reject(msg);
        })
        return deferred.promise;
    }   
};