const sinon = require('sinon');
const assert = require('assert');
const Order = require('../models/Order');
const orderController = require('../controllers/orderController');

describe('Order Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                products: ['prod1', 'prod2'],
                users: ['user1', 'user2'],
                totalPrice: 2500
            },
            params: { id: 'test123' },
            query: {}
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
            send: sinon.stub()
        };
        next = sinon.stub();
    });

    it('should create a new order', async () => {
        const saveStub = sinon.stub(Order.prototype, 'save').resolves(req.body);

        await orderController.createOrder(req, res);

        sinon.assert.calledWith(res.status, 201);
        sinon.assert.calledWith(res.json, sinon.match({
            totalPrice: 2500,
            products: ['prod1', 'prod2']
        }));

        saveStub.restore();
    });

    it('should update an order', async () => {
        const findByIdAndUpdateStub = sinon.stub(Order, 'findByIdAndUpdate').resolves({
            ...req.body,
            _id: 'test123'
        });

        await orderController.updateOrder(req, res);

        sinon.assert.calledWith(findByIdAndUpdateStub, 'test123', req.body, { new: true });
        sinon.assert.calledWith(res.json, sinon.match({
            totalPrice: 2500
        }));

        findByIdAndUpdateStub.restore();
    });

    it('should delete an order', async () => {
        const findByIdAndDeleteStub = sinon.stub(Order, 'findByIdAndDelete').resolves({});

        await orderController.deleteOrder(req, res);

        sinon.assert.calledWith(findByIdAndDeleteStub, 'test123');
        sinon.assert.calledWith(res.status, 204);

        findByIdAndDeleteStub.restore();
    });

    it('should filter orders by date and product', async () => {
        req.query = {
            startDate: '2023-01-01',
            endDate: '2023-12-31',
            productId: 'prod1'
        };

        const findStub = sinon.stub(Order, 'find').returnsThis();
        const populateProductsStub = sinon.stub().returnsThis();
        const populateUsersStub = sinon.stub().resolves([{
            products: ['prod1'],
            users: ['user1'],
            totalPrice: 2500
        }]);

        findStub.populate = populateProductsStub;
        populateProductsStub.populate = populateUsersStub;

        await orderController.getAllOrders(req, res);

        sinon.assert.calledWith(findStub, sinon.match({
            createdAt: sinon.match.object,
            products: 'prod1'
        }));
        sinon.assert.calledWith(res.json, sinon.match.array);

        findStub.restore();
    });
});