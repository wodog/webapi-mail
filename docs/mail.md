## 邮件模块API

##### POST /mail

> 发送html格式邮件

参数: 

字段 | 类型 | 值 | 描述
---- | ---- | --- | ---
action | String | sendWithHTML | 业务动作
api_key | String | 必须 | 用户凭证
to | String或Array | 必须 | 接受邮件对象,String代表一个对象，Array代表多个对象
subject | String | 必须 | 主题
html | String | 必须 | 发送内容

<br>

##### POST /mail

> 发送text格式邮件

参数:

字段 | 类型 | 值 | 描述
---- | ---- | --- | ---
action | String | sendWithText | 业务动作
api_key | String | 必须 | 用户凭证
to | String或Array | 必须 | 接受邮件对象,String代表一个对象，Array代表多个对象
subject | String | 必须 | 主题
text | String | 必须 | 发送内容

<br>

##### POST /mail 

> 使用模版发送邮件

参数:

字段 | 类型 | 值 | 描述
---- | ---- | --- | ---
action | String | sendWithTemplate | 业务动作
api_key | String | 必须 | 用户凭证
to | String或Array | 必须 | 接受邮件对象,String代表一个对象，Array代表多个对象
subject | String | 必须 | 主题
name | String | 必须 | 模版名字
data | String | 可选 | 替换模版内容