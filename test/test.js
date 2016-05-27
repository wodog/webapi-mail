const request = require('supertest');
const assert = require('assert');
const app = require('../server');
const config = require('../config/config');

describe('test for webapi-mail', function() {
    var server, api_key;

    before(function(done) {
        server = request(app.listen());

        const action = 'create';
        const user = config.mail.user;
        const pass = config.mail.pass;
        const host = config.mail.host;
        const port = config.mail.port;
        server
            .post('/users')
            .send({ action })
            .send({ user })
            .send({ pass })
            .send({ host })
            .send({ port })
            .expect(function(res) {
                assert.deepEqual(res.body.code, 0, res.body.data);
                api_key = res.body.data.api_key;
            })
            .end(done);
    });

    after(function(done) {
        const action = 'remove';
        server
            .post('/users')
            .send({ action })
            .send({ api_key })
            .expect(200)
            .expect(function(res) {
                assert.deepEqual(res.body.code, 0, res.body.data);
            })
            .end(done);
    });

    describe('users模块', function() {
        describe('GET /users/:api_key', function() {
            it('should return 0 and success', function(done) {
                server
                    .get('/users/' + api_key)
                    .expect(200)
                    .expect(function(res) {
                        assert.deepEqual(res.body.code, 0, res.body.data);
                    })
                    .end(done);
            });
        });
        describe('POST /users', function() {
            describe('create', function() {
                it('should return 0 and success', function(done) {
                    done();
                });
            });
            describe('/update', function() {
                it('should return 0 and success', function(done) {
                    const action = 'update';
                    server
                        .post('/users')
                        .send({ action })
                        .send({ api_key })
                        .send({ name: 'wodog' })
                        .expect(200)
                        .expect(function(res) {
                            assert.deepEqual(res.body.code, 0, res.body.data);
                        })
                        .end(done);
                });
            });
            describe('remove', function() {
                it('should return 0 and success', function(done) {
                    done();
                });
            });
        });

    });


    describe('templates模块', function() {
        describe('GET /templates/:name', function() {
            it('should return code 0', function(done) {
                const name = 'a';
                server
                    .get('/templates/a')
                    .query({ api_key, name })
                    .expect(200)
                    .expect(function(res) {
                        assert.deepEqual(res.body.code, 0, res.body.data);
                    })
                    .end(done);
            });
        });
        describe('GET /templates', function() {
            it('should return code 0', function(done) {
                server
                    .get('/templates')
                    .query({ api_key })
                    .expect(200)
                    .expect(function(res) {
                        assert.deepEqual(res.body.code, 0, res.body.data);
                    })
                    .end(done);
            });
        });
        describe('POST /templates', function() {
            describe('create', function() {
                it('should return code 0', function(done) {
                    const action = 'create';
                    const name = 'test';
                    const content = 'test_content';
                    server
                        .post('/templates')
                        .send({ api_key, action, name, content })
                        .expect(200)
                        .expect(function(res) {
                            assert.deepEqual(res.body.code, 0, res.body.data);
                        })
                        .end(done);
                });
                it('should return code 0', function(done) {
                    const action = 'create';
                    const name = 'aa';
                    const content = '<h1>${hello}<h1>';
                    server
                        .post('/templates')
                        .send({ api_key, action, name, content })
                        .expect(200)
                        .expect(function(res) {
                            assert.deepEqual(res.body.code, 0, res.body.data);
                        })
                        .end(done);
                });
            });
            describe('update', function() {
                it('should return code 0', function(done) {
                    const action = 'update';
                    const name = 'test';
                    const content = 'test_content_update';
                    server
                        .post('/templates')
                        .send({ api_key, action, name, content })
                        .expect(200)
                        .expect(function(res) {
                            assert.deepEqual(res.body.code, 0, res.body.data);
                        })
                        .end(done);
                });
            });
            describe('remove', function() {
                it('should return code 0', function(done) {
                    const action = 'remove';
                    const name = 'test';
                    server
                        .post('/templates')
                        .send({ api_key, action, name })
                        .expect(200)
                        .expect(function(res) {
                            assert.deepEqual(res.body.code, 0, res.body.data);
                        })
                        .end(done);
                });
            });
        });
    });

    describe('mail模块', function() {
        describe('POST /mail', function() {
            describe('sendWithHTML', function() {
                it('should return 0 and success', function(done) {
                    const action = 'sendWithHTML';
                    const to = 'zhoucy@trendwood.cn';
                    const subject = '测试sendWithHTML标题';
                    const html = '<h1>测试sendWithHTML内容<h1>';
                    server
                        .post('/mail')
                        .send({ action })
                        .send({ api_key })
                        .send({ to })
                        .send({ subject })
                        .send({ html })
                        .expect(200)
                        .expect(function(res) {
                            assert.deepEqual(res.body.code, 0, res.body.data);
                        })
                        .end(done);
                });
            });
            describe('sendWithHTML', function() {
                it('should return 0 and success', function(done) {
                    const action = 'sendWithText';
                    const to = 'zhoucy@trendwood.cn';
                    const subject = '测试sendWithHTML标题';
                    const text = '<h1>测试sendWithHTML内容<h1>';
                    server
                        .post('/mail')
                        .send({ action })
                        .send({ api_key })
                        .send({ to })
                        .send({ subject })
                        .send({ text })
                        .expect(200)
                        .expect(function(res) {
                            assert.deepEqual(res.body.code, 0, res.body.data);
                        })
                        .end(done);
                });
            });
            describe('sendWithTemplate', function() {
                it('should return 0 and success', function(done) {
                    const action = 'sendWithTemplate';
                    const to = 'zhoucy@trendwood.cn';
                    const subject = '测试sendWithHTML标题';
                    const name = 'aa';
                    const data = JSON.stringify({ hello: 'hello template' });
                    server
                        .post('/mail')
                        .send({ action })
                        .send({ api_key })
                        .send({ to })
                        .send({ subject })
                        .send({ name })
                        .send({ data })
                        .expect(200)
                        .expect(function(res) {
                            assert.deepEqual(res.body.code, 0, res.body.data);
                        })
                        .end(done);
                });
            });
        });
    });
});
