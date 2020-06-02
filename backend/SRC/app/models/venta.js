const mongoose = require('mongoose');
const {Schema} = mongoose

var venta = new Schema   ({
      fecha: {type: Date, require: true},
      metodo_pago: {type: String, require: true},
      descuento: {type: Number, require: true},
      total: {type: Number, require: true},
      id_vendedor: {type: String, require: true},
      cliente: {type: String, require: true}
    },
      {collection: 'venta'}
    );
module.exports = mongoose.model('Venta', venta);
