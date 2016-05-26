const request = require('supertest');
const assert = require('assert');
const app = require('../server');


describe('test for webapi-mail', function() {
    var api_key;

    describe('users模块', function() {
        describe('GET /users/:api_key', function() {
            it('should return 0 and success', function(done) {
                request(app.listen())
                    .get('/users')
                    .query({ api_key })
                    .expect(200)
                    .expect(function(res) {
                        assert.deepEqual(res.body.code, 0, res.body.data);
                        assert.deepEqual(res.body.msg, 'success');
                        assert.deepEqual(res.body.data.user, 'qqq536505032@163.com');
                        assert.deepEqual(res.body.data.host, 'smtp.163.com');
                        assert.deepEqual(res.body.data.port, 465);
                        assert.deepEqual(res.body.data.name, 'wodog');
                        assert.deepEqual(res.body.data.pool, false);
                        assert.deepEqual(res.body.data.secure, true);
                        assert.ok(res.body.data.create_at);
                        assert.ok(res.body.data.update_at);
                    })
                    .end(done);
            });
        });
        describe('POST /users', function() {
            describe('create', function() {
                it('should return 0 and success', function(done) {
                    const action = 'create';
                    const user = 'qqq536505032@163.com';
                    const pass = 'qq536505032';
                    const host = 'smtp.163.com';
                    const port = 465;
                    request(app.listen())
                        .post('/users')
                        .send({ action })
                        .send({ user })
                        .send({ pass })
                        .send({ host })
                        .send({ port })
                        .expect(200)
                        .expect(function(res) {
                            assert.deepEqual(res.body.code, 0, res.body.data);
                            assert.deepEqual(res.body.msg, 'success');
                            assert.ok(res.body.data.api_key);
                            api_key = res.body.data.api_key;
                        })
                        .end(done);
                });
            });
            describe('/update', function() {
                it('should return 0 and success', function(done) {
                    request(app.listen())
                        .post('/update')
                        .send({ api_key: api_key })
                        .send({ name: 'wodog' })
                        .expect(200)
                        .expect(function(res) {
                            assert.deepEqual(res.body.code, 0, res.body.data);
                            assert.deepEqual(res.body.msg, 'success');
                            assert.deepEqual(res.body.data, {
                                user: 'qqq536505032@163.com',
                                host: 'smtp.163.com',
                                port: 465,
                                name: 'wodog',
                                pool: false,
                                secure: true
                            });
                        })
                        .end(done);
                });
            });
            describe('remove', function() {
                it('should return 0 and success', function(done) {
                    request(app.listen())
                        .post('/remove')
                        .send({ api_key: api_key })
                        .expect(200)
                        .expect(function(res) {
                            assert.deepEqual(res.body.code, 0, res.body.data);
                            assert.deepEqual(res.body.msg, 'success');
                            assert.deepEqual(res.body.data, '删除成功');
                        })
                        .end(done);
                });
            });
        });

    });
    // describe('/send', function() {
    //  it('should return 0 and success', function(done) {
    //      request(app.listen())
    //          .post('/send')
    //          .send({api_key: api_key})
    //          .send({to: ['qqq536505032@163.com', 'zhoucy@trendwood.cn']})
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
                request(app.listen())
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
                request(app.listen())
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
                    request(app.listen())
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
                    request(app.listen())
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
                    request(app.listen())
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
