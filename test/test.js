const request = require('supertest');
const assert = require('assert');
const app = require('../server');
const config = require('../config/config');

describe('test for webapi-mail', function() {
    var server, api_key;

    before(function(done) {
        server = request(app.listen());

        const user = config.mail.user;
        const pass = config.mail.pass;
        const host = config.mail.host;
        const port = config.mail.port;
        server
            .post('/users?action=create')
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
        server
            .post('/users?action=remove')
            .send({ api_key })
            .expect(200)
            .expect(function(res) {
                assert.deepEqual(res.body.code, 0, res.body.data);
            })
            .end(done);
    });

    describe('users模块', function() {
        describe('POST /users/:api_key', function() {
            it('should return code 0', function(done) {
                server
                    .post('/users/' + api_key)
                    .expect(200)
                    .expect(function(res) {
                        assert.deepEqual(res.body.code, 0, res.body.data);
                    })
                    .end(done);
            });
        });
        describe('POST /users?action=create', function() {
            it('should return code 0', function(done) {
                done();
            });
        });
        describe('POST /users?action=update', function() {
            it('should return code 0', function(done) {
                server
                    .post('/users?action=update')
                    .send({ api_key })
                    .send({ name: 'wodog' })
                    .expect(200)
                    .expect(function(res) {
                        assert.deepEqual(res.body.code, 0, res.body.data);
                    })
                    .end(done);
            });
        });
        describe('POST /users?action=remove', function() {
            it('should return code 0', function(done) {
                done();
            });
        });

    });


    describe('templates模块', function() {
        describe('POST /templates/:name', function() {
            it('should return code 0', function(done) {
                const name = 'a';
                server
                    .post('/templates/a')
                    .query({ name })
                    .send({ api_key })
                    .expect(200)
                    .expect(function(res) {
                        assert.deepEqual(res.body.code, 0, res.body.data);
                    })
                    .end(done);
            });
        });
        describe('POST /templates', function() {
            it('should return code 0', function(done) {
                server
                    .post('/templates')
                    .send({ api_key })
                    .expect(200)
                    .expect(function(res) {
                        assert.deepEqual(res.body.code, 0, res.body.data);
                    })
                    .end(done);
            });
        });
        describe('POST /templates?action=create', function() {
            it('should return code 0', function(done) {
                const name = 'test';
                const content = 'test_content';
                server
                    .post('/templates?action=create')
                    .send({ api_key, name, content })
                    .expect(200)
                    .expect(function(res) {
                        assert.deepEqual(res.body.code, 0, res.body.data);
                    })
                    .end(done);
            });
            it('should return code 0', function(done) {
                const name = 'aa';
                const content = '<h1>${hello}<h1>';
                server
                    .post('/templates?action=create')
                    .send({ api_key, name, content })
                    .expect(200)
                    .expect(function(res) {
                        assert.deepEqual(res.body.code, 0, res.body.data);
                    })
                    .end(done);
            });
        });
        describe('POST /templates?action=update', function() {
            it('should return code 0', function(done) {
                const name = 'test';
                const content = 'test_content_update';
                server
                    .post('/templates?action=update')
                    .send({ api_key, name, content })
                    .expect(200)
                    .expect(function(res) {
                        assert.deepEqual(res.body.code, 0, res.body.data);
                    })
                    .end(done);
            });
        });
        describe('POST /templates?action=remove', function() {
            it('should return code 0', function(done) {
                const name = 'test';
                server
                    .post('/templates?action=remove')
                    .send({ api_key, name })
                    .expect(200)
                    .expect(function(res) {
                        assert.deepEqual(res.body.code, 0, res.body.data);
                    })
                    .end(done);
            });
        });
    });

    describe('mail模块', function() {
        describe('POST /mail?action=send_with_html', function() {
            it('should return code 0', function(done) {
                const to = 'zhoucy@trendwood.cn';
                const subject = '测试sendWithHTML标题';
                const html = '<h1>测试sendWithHTML内容<h1>';
                server
                    .post('/mail?action=send_with_html')
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
        describe('POST /mail?action=send_with_text', function() {
            it('should return code 0', function(done) {
                const to = 'zhoucy@trendwood.cn';
                const subject = '测试sendWithHTML标题';
                const text = '<h1>测试sendWithHTML内容<h1>';
                server
                    .post('/mail?action=send_with_text')
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
        describe('POST /mail?action=send_with_template', function() {
            it('should return code 0', function(done) {
                const to = 'zhoucy@trendwood.cn';
                const subject = '测试sendWithHTML标题';
                const name = 'aa';
                const data = { hello: 'hello template' };
                server
                    .post('/mail?action=send_with_template')
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
