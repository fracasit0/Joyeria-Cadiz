const express = require('express');
const router = express.Router();
const producto = require('../models/producto');
const inv_prod = require('../models/inv_prod');
const inventario = require('../models/inventario');
const pedido = require('../models/pedido');
const Detalle_venta = require('../models/detalle_venta');
const detalle_venta = require('../models/detalle_venta');
const Venta = require('../models/venta');
const venta = require('../models/venta');
const empleado = require('../models/usuario');
const passport = require('../../config/passport');

router.use(passport.initialize());
router.use(passport.session());

	// index routes
	router.get('/', (req, res) => {
		res.render('index');
	});

	//login view
	router.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/inicio',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	router.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/inicio',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

	//profile view
	router.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});

	// logout
	router.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	router.get('/inicio', isLoggedIn, (req, res) =>{
		res.render('inicio', {user: req.user});
	});

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

//Administrar productos
router.get('/productos', isLoggedIn, (req,res) =>{
    producto.find(function (err,producto) {
			if (!err){
        res.render('productos',{
						user: req.user,
            producto: producto
        });
			}else{
				res.redirect('/inicio');
			}
    });

});

router.get('/buscar_producto', isLoggedIn, (req,res) =>{
        res.render('buscar_producto',{
						user: req.user,
            producto: producto
        });
});

router.post('/buscar_producto', isLoggedIn, (req,res) =>{
	producto.find({$or:[{codigo: req.body.codigo},{tipo: req.body.codigo}]}, (err, producto) => {
		if(err || producto == null){
			res.redirect('/inicio');
		}else{
		res.render('detalle_producto',{
			user: req.user,
			producto: producto
		})};
	});
});


router.get('/agregar_prod', isLoggedIn, (req,res) =>{
    res.render('agregar_prod',{
        title: 'Agregar Producto'
    });

});

router.post('/agregar_prod', isLoggedIn, (req,res) => {
    let body = req.body;
    producto.create(body, (err,task) =>{
			if(!err){
			inventario.create({id_sucursal: req.user.id_sucursal}, (err,task) =>{
				inv_prod.create({cod_prod: req.body.codigo, cantidad: req.body.cantidad}, (err,task) =>{
       		res.redirect('/productos');
				});
			});
		}
			else{
				res.redirect('/inicio');
			}
    });
});

router.get('/delete_producto/:id', isLoggedIn, (req,res) =>{
    let id = req.params.id;
    producto.remove({_id: id}, (err, task) =>{
			if(!err){
        res.redirect('/productos');
			}
			else{
					res.redirect('/inicio');
			}
    });
});
router.get('/editar/:id', (req,res) =>{
    producto.findById(req.params.id, (err,producto) => {
        if(!err){
            res.render('editar_prod',{
                title: 'Actualizar',
                producto: producto
            });
        }
				else{
					res.redirect('/inicio');
				}

    });
});

router.post('/editar_prod/:id', function(req, res) {
    producto.findByIdAndUpdate(req.params.id, req.body, function (err) {
      if(err){
        res.redirect('editar_prod/'+req.params.id);
    } else {

      res.redirect('../producto');
    }
    });
  });


//Gestionar pedidos
router.get('/pedidos', isLoggedIn, (req,res) =>{
    pedido.find(function (err,pedido) {
			if(!err){
        res.render('pedidos',{
						user: req.user,
            pedido: pedido
        });
			}
			else{
				res.redirect('/inicio');
			}
    });
});

router.post('/buscar_empleado', isLoggedIn, (req,res) =>{
	empleado.find({$or:[{fecha: req.body.fecha},{tipo: req.body.id_cliente}]}, (err, empleado) => {
		if(err || empleado == null){
			res.redirect('/inicio');
		}else{
		res.render('detalle_empleado',{
			user: req.user,
			empleado: empleado
		})};
	});
});

router.get('/agregar_pedido', isLoggedIn, (req,res) =>{
    res.render('agregar_pedido',{
        title: 'Agregar pedido'
    });

});

router.post('/agregar_pedido', isLoggedIn, (req,res) => {
    let body = req.body;
    pedido.create(body, (err,task) =>{
			if(!err){
       res.redirect('/pedidos');
		 }
		 else{
			 res.redirect('/inicio');
		 }
    });
});

router.get('/delete_pedido/:id', isLoggedIn, (req,res) =>{
    let id = req.params.id;
    pedido.remove({_id: id}, (err, task) =>{
			if(!err){
        res.redirect('/pedidos');
			}
			else{
				res.redirect('/pedido');
			}
    });
});

router.get('/editar_pedido/:id', (req,res) =>{
    pedido.findById(req.params.id, (err,pedido) => {
        if(!err){
            res.render('editar_pedido',{
                title: 'Actualizar Pedido',
                pedido: pedido
            });
        }
				else{
					res.redirect('/inicio');
				}

    });
});

router.post('/editar_pedido/:id', function(req, res) {
    pedido.findByIdAndUpdate(req.params.id, req.body, function (err) {
      if(err){
        res.redirect('/inicio');
    } else {

      res.redirect('../pedidos');
    }
    });
  });



//Realizar venta, se usa una lista para guardar los productos que desea el usuario
router.get('/lista_venta', isLoggedIn, (req,res) =>{
  			lista.find(function (err,lista) {
					if (!err){
        		res.render('lista_venta',{
								user: req.user,
            		lista: lista
        	});
					}else{
						res.redirect('/inicio');
					}
    });
});



router.get('/venta', isLoggedIn, (req,res) =>{
       res.render('venta', {
				 user: req.user
			 });
});

router.get('/lista_productos', isLoggedIn, (req,res) => {
     producto.find(function (err,producto) {
			 if(!err){
				 lista.find((err, lista) => {
		        res.render('lista_productos',{
								user: req.user,
		            producto: producto,
								lista: lista
		        });
	    	});
			};
		});
});

router.get('/crear_venta', isLoggedIn, async (req,res) => {
	await venta.find({} , async (err, venta) => {

		if( venta.length == null || venta.length == 0 ){
			let aux = await new Venta({numero_venta: 1} );
			await aux.save( (err, aux)=> {
				producto.find((err, producto) => {
					 res.render('productos_venta',{
							 user: req.user,
							 producto: producto,
							 numero_venta: aux.numero_venta
					 });
			 	});
			});
	}else{
		let aux = await new Venta({numero_venta: venta.length} );
		await aux.save( (err, aux)=> {
			producto.find((err, producto) => {
				 res.render('productos_venta',{
						 user: req.user,
						 producto: producto,
						 numero_venta: aux.numero_venta
				 });
		 	});
		});
	};
});
});


router.get('/detalle_venta_crear/:codProd/:numero_venta', isLoggedIn, async (req,res) => {
	let num = req.params.numero_venta;
	/*let det = await new Detalle_venta({numero_venta: num, cod_prod: req.params.codProd});
	await det.save()*/
	await detalle_venta.create({numero_venta: num, cod_prod: req.params.codProd})
		producto.find((err, producto) => {
			 res.render('productos_venta',{
					 user: req.user,
					 producto: producto,
					 numero_venta: num
			 });
	 });
});

router.get('/agregar_venta/:numVenta', isLoggedIn, (req,res) => {
		venta.findOne({numero_venta: req.params.numVenta}, (err, venta) =>{
			res.render('agregar_venta', {
				user: req.user,
				venta: venta
			});
		});
});

router.post('/agregar_venta/:id', function(req, res) {
    venta.findByIdAndUpdate(req.params.id, req.body, function (err) {
      if(err){
        res.redirect('/inicio');
    } else {

      res.redirect('../venta');
    }
    });
  });


//Gestionar empleados
router.get('/empleados', isLoggedIn, (req,res) =>{
    empleado.find(function (err,empleado) {
        res.render('empleados',{
						user: req.user,
            empleado: empleado
        });
    });

});

router.get('/delete_empleado/:id', isLoggedIn, (req,res) =>{
    let id = req.params.id;
    empleado.remove({_id: id}, (err, task) =>{
			if(!err){
        res.redirect('/empleados');
    }
		else{
			res.redirect('/inicio');
		}
	});

});

router.get('/editar_empleado/:id', (req,res) =>{
    empleado.findById(req.params.id, (err,empleado) => {
        if(!err){
            res.render('editar_empleado',{
                title: 'Actualizar datos del Empleado',
                empleado: empleado
            });
        }
				else{
					res.redirect('/inicio');
				}

    });
});

router.post('/editar_empleado/:id', function(req, res) {
    empleado.findByIdAndUpdate(req.params.id, req.body, function (err) {
      if(err){
        res.redirect('editar_empleado/'+req.params.id);
    } else {

      res.redirect('../empleados');
    }
    });
  });




module.exports = router;