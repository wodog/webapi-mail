## webapi-mail

邮件相关功能的webapi

#### 使用 

```bash
git clone https://github.com/wodog/webapi_mail.git
cd webapi_mail
npm install
修改config/config.default.js文件
node run start
```

#### API

###### /add  POST  新建一个认证的用户,得到api_key

参数

字段 | 类型 | 必须| 描述
--- | ---- | ----| ----
user | String | 是 | 邮箱账号
pass | String | 是 | 邮箱密码
host | String | 是 | 邮箱服务器地址
port | Number | 是 | 邮箱服务器端口
name | String | 否 | 邮箱昵称
secure | Boolean | 否 | 是否开启SSL,默认true
pool | Boolean | 否 | 是否开启连接池,默认false

返回

字段 | 类型 | 描述 
---- | --- | ----
api_key | String | 用户凭证


###### /update  POST  更新用户

参数

字段 | 类型 | 必须 | 描述
--- | --- | --- | ---
api_key | String | 是 | 用户凭证
user | String | 否 | 邮箱账号
host | String | 否 | 邮箱服务器地址
port | Number | 否 | 邮箱服务器端口
name | String | 否 | 邮箱昵称
secure | Boolean | 否 | 是否开启SSL
pool | Boolean | 否 | 是否开启连接池

返回

返回更新后的字段

###### /view  POST  查看用户

参数

字段 | 类型 | 必须 | 描述
--- | ---- | --- | ---
api_key | String | 是 | 用户凭证

返回

user | String | 否 | 邮箱账号
host | String | 否 | 邮箱服务器地址
port | Number | 否 | 邮箱服务器端口
name | String | 否 | 邮箱昵称
secure | Boolean | 否 | 是否开启SSL
pool | Boolean | 否 | 是否开启连接池


###### /remove POST 删除用户

参数

字段 | 类型 | 必须 | 描述
--- | ---- | --- | ---
api_key | String | 是 | 用户凭证


###### /send  POST  发送邮件 

参数

字段 | 类型 | 描述
--- | ---- | ----
api_key | String | 用户凭证
to | String | 接受对象
subject | String | 主题
text or html | String | 发送内容


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
	code: ${err_code},
	msg: ${err_msg},
	data: ${err_data}
}
```