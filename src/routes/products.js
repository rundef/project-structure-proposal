module.exports = function(server, controllers, helpers) {
  const ProductsCtrl = new controllers.Products(helpers);

  server.get('/products', ProductsCtrl.get.bind(ProductsCtrl));
};
