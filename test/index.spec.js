const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const sinon = require('sinon');
const keyStore = require('../key-store');
const {Request, Response} = require('./mock');
const utils = require('./utils');
const {uniq} = require('lodash');
const Promise = require('bluebird');

chai.use(chaiHttp);

describe('express_authentication_middleware_basics', () => {
    let req, res, next, agent;

    beforeEach((done) => {
        req = new Request();
        res = new Response();
        next = sinon.stub();
        utils.generateKeysFile()
            .then(() => {
                done();
            })
    });

    afterEach((done) => {
        if (agent) {
            agent.close();
        }
        utils.clearKeysFile()
            .then(() => {
                done();
            })
    });

    it('Should generate an API key and add it to file', (done) => {
        keyStore(req, res);
        setTimeout(() => {
            utils.getKeysFromFile()
                .then(data => {
                    data.length.should.eql(1);
                    done();
                })
        }, 500);
    });

    it('Should generate 5 unique API Keys', done => {
        let n = 5;
        for (let i = 0; i < n; i++) {
            keyStore(req, res);
        }
        setTimeout(() => {
            utils.getKeysFromFile()
                .then(data => {
                    data.length.should.eql(n);
                    const uniqKeys = uniq(data);
                    uniqKeys.length.should.eql(data.length);
                    done();
                })
        }, 500);
    });


});
