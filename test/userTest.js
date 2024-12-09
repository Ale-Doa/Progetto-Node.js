const sinon = require('sinon');
const assert = require('assert');
const User = require('../models/User');
const userController = require('../controllers/userController');

describe('User Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                nome: 'Mario',
                cognome: 'Rossi',
                email: 'mario.rossi@example.com'
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

    it('should create a new user', async () => {
        const saveStub = sinon.stub(User.prototype, 'save').resolves(req.body);

        await userController.createUser(req, res);

        sinon.assert.calledWith(res.status, 201);
        sinon.assert.calledWith(res.json, sinon.match({
            nome: 'Mario',
            email: 'mario.rossi@example.com'
        }));

        saveStub.restore();
    });

    it('should update a user', async () => {
        const findByIdAndUpdateStub = sinon.stub(User, 'findByIdAndUpdate').resolves({
            ...req.body,
            _id: 'test123'
        });

        await userController.updateUser(req, res);

        sinon.assert.calledWith(findByIdAndUpdateStub, 'test123', req.body, { new: true });
        sinon.assert.calledWith(res.json, sinon.match({
            nome: 'Mario'
        }));

        findByIdAndUpdateStub.restore();
    });

    it('should delete a user', async () => {
        const findByIdAndDeleteStub = sinon.stub(User, 'findByIdAndDelete').resolves({});

        await userController.deleteUser(req, res);

        sinon.assert.calledWith(findByIdAndDeleteStub, 'test123');
        sinon.assert.calledWith(res.status, 204);

        findByIdAndDeleteStub.restore();
    });
});