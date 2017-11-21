const Int32 = require('mongoose-int32');
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const Product = module.exports = mongoose.model('Product', new Schema({
  Datotid: String,
  Varenummer: Number,
  Varenavn: String,
  Volum: SchemaTypes.Double,
  Pris: SchemaTypes.Double,
  Literpris: SchemaTypes.Double,
  Varetype: String,
  Produktutvalg: String,
  Butikkategori: String,
  Fylde: Int32,
  Friskhet: Int32,
  Garvestoffer: Int32,
  Bitterhet: Int32,
  Sodme: Int32,
  Farge: String,
  Lukt: String,
  Smak: String,
  Passertil01: String,
  Passertil02: String,
  Passertil03: String,
  Land: String,
  Distrikt: String,
  Underdistrikt: String,
  Argang: String,
  Rastoff: String,
  Metode: String,
  Alkohol: SchemaTypes.Double,
  Sukker: SchemaTypes.Double,
  Syre: String,
  Lagringsgrad: String,
  Produsent: String,
  Grossist: String,
  Distributor: String,
  Emballasjetype: String,
  Korktype: String,
  Vareurl: String,
  APK: SchemaTypes.Double
}));

module.exports.getAllProductTypes = function(callback){
  Product.find().distinct('Varetype',callback).lean();
};

module.exports.getAllCountries = function(callback){
  Product.find().distinct('Land',callback).lean();
};

module.exports.getOneProduct = function(callback){
  Product.findOne(callback).lean();
};

module.exports.getAllProducts = function(callback){
  Product.find({Varenavn: {$ne: null}}, callback).sort('Varenavn').limit(25).lean();
};

module.exports.getProductsInRange = function(callback){
  Product.find({Varenavn: {$ne: null}}, callback).sort('Varenavn').limit(25).lean();
};

module.exports.getProducts = function(search, callback) {
  search = JSON.parse(search)
  const searchRegEx = new RegExp(search.value ? search.value : '', 'i');
  const land = search.filters.countries;
  const varetype = search.filters.productTypes;

  Product
  .find({
    Land: land.length > 0 ? {$in: land} : /.*/g,
    Varetype: varetype.length > 0 ? {$in: varetype} : /.*/g
  }, callback)
  .or([
    {Varenavn: {$regex: searchRegEx}},
    {Varetype: {$regex: searchRegEx}},
    {Land: {$regex: searchRegEx}}])
  .sort((search.sort ? search.sort : {APK: -1}))
  .limit(search.limit ? search.limit : 20)
  .skip(search.startIndex)
  .lean();
};

module.exports.getAutoComplete = function(search, callback) {
  search = JSON.parse(search)
  const searchRegEx = new RegExp(search.value, "i")
  Product
    .find(callback)
    .or([{Varenavn: { $regex: searchRegEx }}])
    .sort('Varenavn')
    .limit(5)
    .skip(search.startIndex)
    .lean();
};

module.exports.getProductsById = function(idList, callback) {
  Product.find({
    '_id': {
      $in: idList
    }
  }).exec(callback)
};

/* setsAPK for all products should not be used unless update is necessary
module.exports.setApk = function() {
  Product.find((err, products) => {
      if(err){
        console.log('error')
      } //do something...
      let count = 0
      products.map(product => {
        if (product.Pris && product.Volum && product.Alkohol){
          count ++
          console.log(count,' productID: ',product._id,' Pris: ',product.Pris.value,' Volum: ',product.Volum.value,' AlkoholProsent: ',product.Alkohol.value,' APK: ',(((product.Volum.value * 1000) * (product.Alkohol.value / 100)) / product.Pris.value))
          Product.update(
           {_id: product._id},
           {APK : (((product.Volum.value * 1000) * (product.Alkohol.value / 100)) / product.Pris.value)},
           {multi:true},
             function(err, numberAffected){
               console.log(err)
               console.log(numberAffected)
          });
        }
      })
  })
};
*/
