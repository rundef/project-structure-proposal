let request = require('request');

class ProductsController {
  constructor(helpers) {
  }
  get(req, res, next) {
    let per_page = 10;

    if(typeof req.query.filter != 'undefined' && typeof req.query.filter.per_page != 'undefined') {
      per_page = parseInt(req.query.filter.per_page);
    }

    let products = [
      { code: '161739M236006', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236007', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236008', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236009', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236010', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236011', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236012', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236013', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236014', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236015', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236016', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236017', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236018', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236019', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'},
      { code: '161739M236020', name: 'Black Taka Hayashi Edition HSK8 Nomad LX Sneakers', description: '...'}
    ];

    res.send(products.slice(0,per_page));
  }
}

module.exports = ProductsController;
