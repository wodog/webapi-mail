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

#### TODO

- [ ] 发送记录
- [ ] 内容模板
- [ ] 智能识别邮箱服务器

#### API

<br>

##### GET /users/:api_key

> 查看用户

参数

字段 | 类型 | 值 | 描述
--- | ---- | --- | ---
api_key | String | 必须 | 用户凭证

返回

字段 | 类型 | 描述
--- | ---- | ---
user | String | 邮箱账号
host | String | 邮箱服务器地址
port | Number | 邮箱服务器端口
name | String | 邮箱昵称
secure | Boolean | 是否开启SSL
pool | Boolean | 是否开启连接池
create_at | Date | 创建时间
update_at | Date | 更新时间

<br>

##### POST /users  

> 新建一个认证的用户,得到api_key

参数

字段 | 类型 | 值| 描述
--- | ---- | ----| ----
action | String | create | 业务动作
user | String | 必须 | 邮箱账号
pass | String | 必须 | 邮箱密码
host | String | 必须 | 邮箱服务器地址
port | Number | 必须 | 邮箱服务器端口
name | String | 可选 | 邮箱昵称
secure | Boolean | 可选 | 是否开启SSL,默认true
pool | Boolean | 可选 | 是否开启连接池,默认false

返回

字段 | 类型 | 描述 
---- | --- | ----
api_key | String | 用户凭证

<br>

##### POST /users  

> 更新用户

参数

字段 | 类型 | 值 | 描述
--- | --- | --- | ---
api_key | String | 必须 | 用户凭证
action | String | update | 业务动作
user | String | 可选 | 邮箱账号
host | String | 可选 | 邮箱服务器地址
port | Number | 可选 | 邮箱服务器端口
name | String | 可选 | 邮箱昵称
secure | Boolean | 可选 | 是否开启SSL
pool | Boolean | 可选 | 是否开启连接池

返回

返回更新后的字段

<br>

##### POST /users 

> 删除用户

参数

字段 | 类型 | 值 | 描述
--- | ---- | --- | ---
api_key | String | 必须 | 用户凭证
action  | String | remove | 业务动作

<br>

##### /send  
POST  发送邮件 

参数

字段 | 类型 | 值 | 描述
--- | ---- | ---- |----
api_key | String | 必须 |  用户凭证
to | String或Array | 必须 | 接受邮件对象,String代表一个对象，Array代表多个对象
subject | String | 必须 | 主题
html | String | 必须 | 发送内容

<br>

##### GET /templates

> 获取所有的模版

参数:  

字段 | 类型 | 值 | 描述
--- | ---- | --- | ---
api_key | String | 必须 | 用户凭证
 
返回data:  

模版数组

<br>

##### GET /templates/:name

> 根据模版名字查看模版

参数:  

字段 | 类型 | 值 | 描述
--- | ---- | --- | ---
api_key | String | 必须 | 用户凭证
name | String | 必须 | 模版名字
 
返回data:  

字段 | 类型 | 描述
---- | ---- | ---
name | String | 模版名字
content | String | 模版内容
create_at | Date | 创建时间
update_at | Date | 更新时间

<br>

##### POST /templates

> 创建模版 

参数:  

字段 | 类型 | 值 | 描述
---- | ---- | --- | ---
action | String | create | 业务动作
api_key | String | 必须 | 用户凭证
name | String | 必须 | 模版名字
content | String | 必须 | 模版内容
format | String | 默认html | 邮件格式

返回data:  

字段 | 类型 | 描述
---- | ---- | ---
name | String | 模版名字
content | String | 模版内容
create_at | Date | 创建时间
update_at | Date | 更新时间

<br>

##### POST /templates

> 更新模版内容

参数:  

字段 | 类型 | 值 | 描述
---- | --- | --- | ---
action | String | update | 业务动作
api_key | String | 必须 | 用户凭证
name | String | 必须 | 模版名字
content | String | 可选 | 模版内容
format | String | 可选 | 邮件格式

返回data:  

字段 | 类型 | 描述
---- | ---- | ---
name | String | 模版名字
content | String | 模版内容
create_at | Date | 创建时间
update_at | Date | 更新时间

<br>

##### POST /templates

> 删除模版

参数:  

字段 | 类型 | 值 | 描述
----| ---- | --- | ---
action | String | remove | 业务动作
api_key | String | 必须 | 用户凭证
name | String | 必须 | 模版名字

返回data:  

字段 | 类型 | 描述
---- | ---- | ---
name | String | 模版名字
content | String | 模版内容
create_at | Date | 创建时间
update_at | Date | 更新时间

<br>

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
