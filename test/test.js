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
    // describe('/send', function() {
    //  it('should return 0 and success', function(done) {
    //      server
    //          .post('/send')
    //          .send({api_key: api_key})
    //          .send({to: [config.mail.user, 'zhoucy@trendwood.cn']})
    //          .send({subject: '测试主题'})
    //          .send({html: '<p>测试内容</p>'})
    //          .expect(200)
    //          .expect(function(res) {
    //              assert.deepEqual(res.body.code, 0, res.body.data);
    //              assert.deepEqual(res.body.msg, 'success');
    //              assert.deepEqual(res.body.data, '邮件发送成功');
    //          })
    //          .end(done);
    //  });
    // });

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
});
