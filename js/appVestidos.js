angular.module( 'appVestidos' , 
	[ 'ngSanitize' , 'modelOptions' , 'ui.router', 'angular-loading-bar' , 'ezfb' , 'ngResource' , 'ui.materialize' ] )


.config(
	[ '$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider' , 'ezfbProvider' ,
	function( $stateProvider , $urlRouterProvider , cfpLoadingBarProvider , ezfbProvider ) {
		'use strict';

		ezfbProvider.setInitParams({
			appId: '1862370520653764',
			version: 'v2.3'
		});

		cfpLoadingBarProvider.latencyThreshold = 500;

		$urlRouterProvider.otherwise('/inicio');

		$stateProvider

		//Página Principal
		.state('inicio', {
			url: 			'/inicio',
			templateUrl: 	'views/inicio.html',
			controller: 	function( $scope ) {
				var revapi;

				revapi = jQuery('.tp-banner').revolution(
				{
					delay:9000,
					startwidth:1170,
					startheight:500,
					hideThumbs:10

				});
			}
		})
		.state('login', {
			url: 			'/login',
			templateUrl: 	'views/panel.html',
			controller: 	'login',
		})
		.state('servicios', {
			url: 			'/servicios',
			templateUrl: 	'views/servicios.html',
			controller: 	function() {
				$('.slider').slider({full_width: true});
		    	$('.slider').slider('start');
			}
		})
		.state('acceso', {
			url: 			'/acceso',
			templateUrl: 	'views/acceso.html' ,
			/*controller: 	function( $scope ) {				
				$scope.$watch('pluginOn', function (newVal, oldVal) { 
					if (newVal !== oldVal) {
					  $scope.rendering = true;
					}
				});

				$scope.$on('$routeChangeSuccess', function () {
					console.log('hola');
					$scope.rendering = true;
				});

				$scope.rendered = function () {
					$scope.rendering = false;
				};
			}*/
		})
		.state('galeria', {
			url: 			'/Galeria',
			templateUrl: 	'views/galeria.html' ,
			controller: 	'galeria',
		})
		.state('comunidad', {
			url: 			'/comunidad-inice',
			templateUrl: 	'views/comunidad.html' ,
		})
		.state('contacto', {
			url: 			'/contacto',
			templateUrl: 	'views/contacto.html' ,
			controller: function( $scope , mailService ) {

				$scope.sendmail = function( ) {
					if( $scope.correo_form.$valid ) {
						mailService.sendmail(
							{
								nombre: 	$scope.nombre,
								correo: 	$scope.correo,
								mensaje: 	$scope.mensaje,
								asunto: 	$scope.asunto,
							}
						)
						.success( 
							function( data ) {
								swal("Enviado", "Su mensaje ha sido enviado.", "success");
								$scope.nombre							= undefined;
								$scope.correo							= undefined;
								$scope.mensaje							= undefined;
								$scope.asunto							= undefined;

								$scope.correo_form.nombre.  $pristine		= true;
								$scope.correo_form.correo.$pristine		= true;
								$scope.correo_form.mensaje.$pristine	= true;
								$scope.correo_form.asunto.$pristine		= true;

								$scope.correo_form.nombre.$dirty		= false;
								$scope.correo_form.correo.$dirty		= false;
								$scope.correo_form.mensaje.$dirty		= false;
								$scope.correo_form.asunto.$dirty		= false;
							}
						)
						.error(
							function( data ) {
								swal("Ha ocurrido un error", "Su mensaje no ha sido enviado", "error");
							}
						);
					}
				}
			}
		})
        .state('admin', {
            url:            '/cms',
            templateUrl:    'views/cms.html',
        })
            .state('admin.banner_cms', {
                url:            '/banner',
                templateUrl:    'views/banner_cms.html',
            })
            .state('admin.galeria_cms', {
                url:            '/Galeria',
                templateUrl:    'views/galeria_cms.html',
            })
                .state('admin.galeria_cms.categorias', {
                    url:            '/categorias',
                    templateUrl:    'views/categorias.html',
                    controller: 	'CategoriasListCtrl',
                    controllerAs: 	'categoria',
                })
                .state('admin.galeria_cms.categoria_alta', {
                    url:            '/Categorias/Alta',
                    templateUrl:    'views/categorias_form.html',
                    controller:     'categoriasCreateCtrl',
                    controllerAs:   'categoria',
                })
                .state('admin.galeria_cms.productos', {
                    url:            '/Productos',
                    templateUrl:    'views/productos.html',
                    controller:     'ProductosListCtrl',
                    controllerAs:   'galeria',
                })
                .state('admin.galeria_cms.productos_alta', {
                    url:            '/Productos/Alta',
                    templateUrl:    'views/productos_form.html',
                    controller:     'ProductosCreateCtrl',
                    controllerAs:   'producto',
                })
            .state('admin.bloog_cms', {
                url:            '/bloog',
                templateUrl:    'views/bloog_cms.html',
            })
	}
])

.run([
	'$rootScope', '$state' , 'cfpLoadingBar' , 
	function( $rootScope, $state , cfpLoadingBar ) {
	'use strict';

	$rootScope.pluginOn = true;
  	$rootScope.rendering = false;

	$rootScope.$state = $state;
	$rootScope.$on('$stateChangeStart', function() {
		cfpLoadingBar.start();
	});

	$rootScope.$on('$stateChangeSuccess', function() {
		cfpLoadingBar.complete();
	});

	$rootScope.rendered = function () {
		$rootScope.rendering = false;
	};
	
	$rootScope.$watch('pluginOn', function (newVal, oldVal) { 
		if (newVal !== oldVal) {
		  $rootScope.rendering = true;
		}
	});

	$rootScope.$on('$routeChangeSuccess', function () {
		$rootScope.rendering = true;
	});
}]);
// Controllers

angular.module( 'appVestidos' )
.controller( 'login' , login )

login.$inject = [ '$state' , '$scope' , '$http' ];

function login( $state , $scope , $http ) {

	//$scope.datos_form = {};

	$scope.login = function(){
      	$http.post( "manager/login_controller.php", {
      		correo 		: $scope.correo,
      		password	: $scope.password
        })
        .success(function(respuesta){
            console.log(respuesta);
            swal("", "Login Exitoso", "success");
        })
        .error(function(respuesta){
        	console.log(respuesta);
            swal("", "Su contraseña o nombre de usuario son incorrectos", "warning");
        });
    } 
	/*$scope.login = function() {
        $scope.datos_form.correo  	= $scope.correo;
        $scope.datos_form.password	= $scope.password;
        
        ServicioLogin.login( $scope.datos_form,
        	function( data ) {
                console.log('todo salio bien')
            }, function( data ) {
                swal("", "Su contraseña o nombre de usuario son incorrectos", "warning");
            }
        )
        //console.log(data);
    };*/
};

angular.module( 'appVestidos' )
.controller( 'galeria' , galeria )

galeria.$inject = [ '$scope' ]

function galeria( $scope ) {
	'use strict';
	$scope.imegenes = [
		{
			nombre: "vestido",
			url: 	"http://farm6.static.flickr.com/5746/20508830138_a7b6a051c9_b.jpg",
		},
		{
			nombre: "flor",
			url: 	"http://d3bvl598xc7qos.cloudfront.net/upimg/s330/1f/79/86e41583bd21f1d2fdd647ca99a11f79.jpg",
		}

	];
        // finally, initialize photobox on all retrieved images
        $('#gallery').photobox('a', { thumbs:true, loop:false }, callback);
        // using setTimeout to make sure all images were in the DOM, before the history.load() function is looking them up to match the url hash
        setTimeout(window._photobox.history.load, 2000);
        function callback(){
            console.log('callback for loaded content:', this);
        };
    //});	
};


// Services
angular.module( 'appVestidos' )
.service( 'ServicioLogin' , ServicioLogin )

ServicioLogin.$inject = [ '$http' ];

function ServicioLogin( $http ) {

	this.login = function( datos , success, fail ) {
		return $http({
			method: 'POST',
			url: 'manager/login.php',
			data: datos,
			headers: {'Content-Type': 'application/json'},
			function( data ) {
                success( data );
            }, function( data ) {
                fail( data.data );
            }
		});
	}
};

angular.module( 'appVestidos' )
.service( 'mailService' , mailService )

mailService.$inject = [ '$http' ];

function mailService( $http ) {

	this.sendmail = function( datos ) {
		return $http({
			method: 'POST',
			url: 'mail/sendmail.php',
			data: 'nombre='+ datos.nombre + '&correo=' + datos.correo+'&mensaje='+ datos.mensaje + '&asunto='+datos.asunto,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	}
};