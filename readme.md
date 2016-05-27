## webapi-mail

邮件相关功能的webapi

#### 使用 

```bash
git clone https://github.com/wodog/webapi_mail.git
cd webapi_mail
npm install
修改config/default.config.js文件
node run start
```
#### 测试

```bash
npm run test
```

#### TODO

- [ ] 发送记录
- [ ] 内容模板
- [ ] 智能识别邮箱服务器

#### API

* [用户模块](docs/user.md)
* [模版模块](docs/template.md)
* [邮件模块](docs/mail.md)

#### 通用返回格式

```js
// 成功
{
	code: 0,
	msg: 'success',
	data: ${data}
}

// 失败
{
	code: -1,
	msg: 'failure',
	data: ${err_message}
}
```
