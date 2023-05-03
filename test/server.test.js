/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

const request = require('supertest');
const chai = require('chai');

const app = require('../server.js');

const { expect } = chai;

describe('Products DB', () => {
  it('should get the first 5 rows of data from products from /products route with correct shape', (done) => {
    request(app)
      .get('/products')
      .end((err, res) => {
        expect(res.body.length).to.equal(5);
        expect(typeof res.body[0].product_id).to.equal('number');
        expect(typeof res.body[0].name).to.equal('string');
        expect(typeof res.body[0].slogan).to.equal('string');
        expect(typeof res.body[0].description).to.equal('string');
        expect(typeof res.body[0].category).to.equal('string');
        expect(typeof res.body[0].default_price).to.equal('number');
        done();
      });
  });
  it('should get individual product with correct shape and features', (done) => {
    request(app)
      .get('/products/71698')
      .end((err, res) => {
        expect(res.body.product_id).to.equal(71698);
        expect(typeof res.body.name).to.equal('string');
        expect(typeof res.body.slogan).to.equal('string');
        expect(typeof res.body.description).to.equal('string');
        expect(typeof res.body.category).to.equal('string');

        expect(res.body.features[0].feature).to.exist;
        expect(res.body.features[0].value).to.exist;

        done();
      });
  });
  it('should get individual product and all styles, with correct shape + photos and skus', (done) => {
    request(app)
      .get('/products/71697/styles')
      .end((err, res) => {
        expect(res.body.product_id).to.equal(71697);

        expect(res.body.results[0].photos[0].url).to.exist;
        expect(res.body.results[0].photos[0].thumbnail_url).to.exist;

        expect(res.body.results[0].skus).to.exist;
        done();
      });
  });
});
