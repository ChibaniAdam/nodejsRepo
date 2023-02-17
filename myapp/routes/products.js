var express = require('express');
var router = express.Router();
var products = require('../public/products');

for (var i in products) {
    products[i].id = i;
}
router.get('/', function(req, res, next) {
  res.json(products);
});
router.get('/:id', (req, res, next)=> {res.json(
 products[req.params.id],
)});
router.get('/instock/:qt', (req, res, next)=> {res.json(
    products.filter((product)=>product.stock == req.params.qt),
)});
router.get('/:id/:qt', (req, res, next)=> {res.json(
    products[req.params.id][req.params.qt],
   )});



module.exports = router;
