const app = require('../server.js');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('Products DB', () => {
  it ('should get the first 5 rows of data from products from /products route', (done) => {
    request(app)
      .get('/products')
      .end((err, res) => {
        expect(res.body.length).to.equal(5);
        expect(typeof res.body[0]).to.equal('object');
        done();
      });
  });
  it ('should get individual product with features from /products/:product_id route ', (done) => {
    request(app)
      .get('/products/71697')
      .end((err, res) => {
        console.log(res.body);
        done();
      });
  });
  it ('should get the first 5 rows of data from products', (done) => {
    request(app)
      .get('/products/71697/styles')
      .end((err, res) => {
        console.log(res.body);
        done();
      });
  });
});
