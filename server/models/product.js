const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
var Int32 = require('mongoose-int32');

const Product = module.exports = mongoose.model('Product', new Schema({ 
  Datotid : String,
  Varenummer: Number,
  Varenavn : String,
  Volum : SchemaTypes.Double,
  Pris : SchemaTypes.Double,
  Literpris : SchemaTypes.Double,
  Varetype : String,
  Produktutvalg : String,
  Butikkategori : String,
  Fylde : Int32,
  Friskhet : Int32,
  Garvestoffer : Int32,
  Bitterhet : Int32,
  Sodme : Int32,
  Farge : String,
  Lukt : String,
  Smak : String,
  Passertil01 : String,
  Passertil02 : String,
  Passertil03 : String,
  Land : String,
  Distrikt : String,
  Underdistrikt : String,
  Argang : String,
  Rastoff : String,
  Metode : String,
  Alkohol : SchemaTypes.Double,
  Sukker : SchemaTypes.Double,
  Syre : String,
  Lagringsgrad : String,
  Produsent : String,
  Grossist : String,
  Distributor : String,
  Emballasjetype : String,
  Korktype : String,
  Vareurl : String
}));

module.exports.getOneProduct = function(callback){
  Product.findOne(callback).lean();
}
module.exports.getAllProducts = function(callback){
  Product.find(callback).lean();
}

module.exports.getSpecificProducts= function(query,callback){
  Product.find(query,callback).lean();
}