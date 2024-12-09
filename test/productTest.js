const sinon = require('sinon');
const assert = require('assert');
const Product = require('../models/Product');
const productController = require('../controllers/productController');

describe('Product Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                name: 'Viaggio in Giappone',
                description: 'Tour esclusivo',
                price: 1500
            },
            params: { id: 'test123' }
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
            send: sinon.stub()
        };
        next = sinon.stub();
    });

    it('should create a new product', async () => {
        const saveStub = sinon.stub(Product.prototype, 'save').resolves(req.body);

        await productController.createProduct(req, res);

        sinon.assert.calledWith(res.status, 201);
        sinon.assert.calledWith(res.json, sinon.match({
            name: 'Viaggio in Giappone',
            price: 1500
        }));

        saveStub.restore();
    });

    it('should update a product', async () => {
        const findByIdAndUpdateStub = sinon.stub(Product, 'findByIdAndUpdate').resolves({
            ...req.body,
            _id: 'test123'
        });

        await productController.updateProduct(req, res);

        sinon.assert.calledWith(findByIdAndUpdateStub, 'test123', req.body, { new: true });
        sinon.assert.calledWith(res.json, sinon.match({
            name: 'Viaggio in Giappone'
        }));

        findByIdAndUpdateStub.restore();
    });

    it('should delete a product', async () => {
        const findByIdAndDeleteStub = sinon.stub(Product, 'findByIdAndDelete').resolves({});

        await productController.deleteProduct(req, res);

        sinon.assert.calledWith(findByIdAndDeleteStub, 'test123');
        sinon.assert.calledWith(res.status, 204);

        findByIdAndDeleteStub.restore();
    });
});