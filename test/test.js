const request = require('supertest');
const assert = require('assert');
const app = require('../server');

describe('test for webapi-mail', function() {
    var api_key;

    describe('/add', function() {
        it('should return 0 and success', function(done) {
            request(app.listen())
                .post('/add')
                .send({ 'user': 'qqq536505032@163.com' })
                .send({ 'pass': 'qq536505032' })
                .send({ 'host': 'smtp.163.com' })
                .send({ 'port': 465 })
                .expect(200)
                .expect(function(res) {
                    assert.deepEqual(res.body.code, 0);
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
                    assert.deepEqual(res.body.code, 0);
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

    describe('/view', function() {
        it('should return 0 and success', function(done) {
            request(app.listen())
                .post('/view')
                .send({ api_key: api_key })
                .expect(200)
                .expect(function(res) {
                    assert.deepEqual(res.body.code, 0);
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

    describe('/send', function() {
    	it('should return 0 and success', function(done) {
    		request(app.listen())
    			.post('/send')
    			.send({api_key: api_key})
    			.send({to: 'qqq536505032@163.com'})
    			.send({subject: '测试主题'})
    			.send({html: '<p>测试内容</p>'})
    			.expect(200)
    			.expect(function(res) {
    				assert.deepEqual(res.body.code, 0);
    				assert.deepEqual(res.body.msg, 'success');
    				assert.deepEqual(res.body.data, '邮件发送成功');
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
                    assert.deepEqual(res.body.code, 0);
                    assert.deepEqual(res.body.msg, 'success');
                    assert.deepEqual(res.body.data, '删除成功');
                })
                .end(done);
        });
    });
});
