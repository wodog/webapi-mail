## 模版模块API

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