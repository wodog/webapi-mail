## 用户模块API

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
