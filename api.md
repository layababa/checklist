上线流程文档
登录
POST:http://web.flimzor.xyz/stage-api/login
请求报文
{
  "username": "admin",
  "password": "admin123",
}
响应报文
{
  "msg": "操作成功",
  "code": 200,
  "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImxvZ2luX3VzZXJfa2V5IjoiOTU0YzQ5ZTEtZmRmMC00OGU5LTg5ODctMzkxYWUxMDM1YmFkIn0.UMJHJm5b15XqmgtANTuLmBwfZjc_FS3hnQHN9D8YzjPOm8l2JTapNjIDcVnqFV-bwmrQ9yKsTZ7SoejtMYC-bA"
}

 
查询接口
http://web.flimzor.xyz/stage-api/system/workflow/list?pageNum=1&pageSize=10
响应报文：
{
	"code": 0,
	"data": [
		{
  "bugTest": "boolean", // 已知bug已修复或延期处理
  "coreTest": "boolean", // 核心功能回归测试已完成
  "createBy": "string",
  "createTime": "string(date-time)",
  "demand": "boolean", // 所有需求变更已同步
  "front1": "boolean", // 前端代码已发布到预发布环境
  "front2": "boolean", // 静态资源已更新
  "front3": "boolean", // CDN缓存已刷新
  "front4": "boolean", // 页面访问正常
  "frontDemand": "boolean", // 客户端开发内容符合产品需求
  "frontInfo": "string", // 前端更新内容与额外说明
  "frontTest": "boolean", // 客户端更新模块已逐一测试
  "id": "integer(int64)",
  "params": "object",
  "prd": "boolean", // PRD文档已更新
  "prod1": "boolean", // 预发布验收已通过
  "prod10": "boolean", // 页面访问正常
  "prod2": "boolean", // 生产环境数据库变更已执行
  "prod3": "boolean", // 服务端代码已发布
  "prod4": "boolean", // 服务启动正常
  "prod5": "boolean", // 健康检查通过
  "prod6": "boolean", // 监控指标正常
  "prod7": "boolean", // 服务端发布已完成
  "prod8": "boolean", // 前端代码已发布
  "prod9": "boolean", // CDN缓存已刷新
  "product1": "boolean", // 产品功能符合需求
  "product2": "boolean", // 用户体验符合预期
  "product3": "boolean", // 文案/UI 无误
  "product4": "boolean", // 业务流程验证通过
  "putDate": "string(date-time)", // 上线时间
  "relevanceTest": "boolean", // 关联功能回归测试已完成
  "remark": "string",
  "server1": "boolean", // 预发布环境代码已更新
  "server2": "boolean", // 所有服务（不止1个，多个服务）启动正常
  "server3": "boolean", // 日志无异常报错
  "server4": "boolean", // 配置文件已检查
  "serverDemand": "boolean", // 服务端开发内容符合产品需求
  "serverInfo": "string", // 后端更新内容与额外说明
  "serverTest": "boolean", // 服务端更新模块已逐一测试
  "table1": "boolean", // 已review服务端提供的表结构变更
  "table2": "boolean", // 表结构变更脚本已准备
  "table3": "boolean", // 表结构变更已在预发布环境执行
  "tableInfo": "string", // 表结构涉及更新与额外说明
  "test1": "boolean", // 新功能在预发布环境测试通过
  "test2": "boolean", // 核心流程验证通过
  "test3": "boolean", // 数据准确性验证通过
  "test4": "boolean", // 性能表现符合预期
  "updateBy": "string",
  "updateTime": "string(date-time)",
  "verify1": "boolean", // 新功能验证通过
  "verify10": "boolean", // 产品确认
  "verify2": "boolean", // 核心功能验证通过
  "verify3": "boolean", // 正常流程回归通过
  "verify4": "boolean", // 数据一致性检查通过
  "verify5": "boolean", // 客户端确认
  "verify6": "boolean", // 服务端确认
  "verify7": "boolean", // 运维确认
  "verify8": "boolean", // 前端运维确认
  "verify9": "boolean" // 测试确认
}
	],
	"msg": ""
}
 
新增接口
POST: http://web.flimzor.xyz/stage-api/system/workflow
请求报文：
{
  "bugTest": "boolean", // 已知bug已修复或延期处理
  "coreTest": "boolean", // 核心功能回归测试已完成
  "createBy": "string",
  "createTime": "string(date-time)",
  "demand": "boolean", // 所有需求变更已同步
  "front1": "boolean", // 前端代码已发布到预发布环境
  "front2": "boolean", // 静态资源已更新
  "front3": "boolean", // CDN缓存已刷新
  "front4": "boolean", // 页面访问正常
  "frontDemand": "boolean", // 客户端开发内容符合产品需求
  "frontInfo": "string", // 前端更新内容与额外说明
  "frontTest": "boolean", // 客户端更新模块已逐一测试
  "id": "integer(int64)",
  "params": "object",
  "prd": "boolean", // PRD文档已更新
  "prod1": "boolean", // 预发布验收已通过
  "prod10": "boolean", // 页面访问正常
  "prod2": "boolean", // 生产环境数据库变更已执行
  "prod3": "boolean", // 服务端代码已发布
  "prod4": "boolean", // 服务启动正常
  "prod5": "boolean", // 健康检查通过
  "prod6": "boolean", // 监控指标正常
  "prod7": "boolean", // 服务端发布已完成
  "prod8": "boolean", // 前端代码已发布
  "prod9": "boolean", // CDN缓存已刷新
  "product1": "boolean", // 产品功能符合需求
  "product2": "boolean", // 用户体验符合预期
  "product3": "boolean", // 文案/UI 无误
  "product4": "boolean", // 业务流程验证通过
  "putDate": "string(date-time)", // 上线时间
  "relevanceTest": "boolean", // 关联功能回归测试已完成
  "remark": "string",
  "server1": "boolean", // 预发布环境代码已更新
  "server2": "boolean", // 所有服务（不止1个，多个服务）启动正常
  "server3": "boolean", // 日志无异常报错
  "server4": "boolean", // 配置文件已检查
  "serverDemand": "boolean", // 服务端开发内容符合产品需求
  "serverInfo": "string", // 后端更新内容与额外说明
  "serverTest": "boolean", // 服务端更新模块已逐一测试
  "table1": "boolean", // 已review服务端提供的表结构变更
  "table2": "boolean", // 表结构变更脚本已准备
  "table3": "boolean", // 表结构变更已在预发布环境执行
  "tableInfo": "string", // 表结构涉及更新与额外说明
  "test1": "boolean", // 新功能在预发布环境测试通过
  "test2": "boolean", // 核心流程验证通过
  "test3": "boolean", // 数据准确性验证通过
  "test4": "boolean", // 性能表现符合预期
  "updateBy": "string",
  "updateTime": "string(date-time)",
  "verify1": "boolean", // 新功能验证通过
  "verify10": "boolean", // 产品确认
  "verify2": "boolean", // 核心功能验证通过
  "verify3": "boolean", // 正常流程回归通过
  "verify4": "boolean", // 数据一致性检查通过
  "verify5": "boolean", // 客户端确认
  "verify6": "boolean", // 服务端确认
  "verify7": "boolean", // 运维确认
  "verify8": "boolean", // 前端运维确认
  "verify9": "boolean" // 测试确认
}
修改接口
PUT: http://web.flimzor.xyz/stage-api/system/workflow
请求报文：
{
  "bugTest": "boolean", // 已知bug已修复或延期处理
  "coreTest": "boolean", // 核心功能回归测试已完成
  "createBy": "string",
  "createTime": "string(date-time)",
  "demand": "boolean", // 所有需求变更已同步
  "front1": "boolean", // 前端代码已发布到预发布环境
  "front2": "boolean", // 静态资源已更新
  "front3": "boolean", // CDN缓存已刷新
  "front4": "boolean", // 页面访问正常
  "frontDemand": "boolean", // 客户端开发内容符合产品需求
  "frontInfo": "string", // 前端更新内容与额外说明
  "frontTest": "boolean", // 客户端更新模块已逐一测试
  "id": "integer(int64)",
  "params": "object",
  "prd": "boolean", // PRD文档已更新
  "prod1": "boolean", // 预发布验收已通过
  "prod10": "boolean", // 页面访问正常
  "prod2": "boolean", // 生产环境数据库变更已执行
  "prod3": "boolean", // 服务端代码已发布
  "prod4": "boolean", // 服务启动正常
  "prod5": "boolean", // 健康检查通过
  "prod6": "boolean", // 监控指标正常
  "prod7": "boolean", // 服务端发布已完成
  "prod8": "boolean", // 前端代码已发布
  "prod9": "boolean", // CDN缓存已刷新
  "product1": "boolean", // 产品功能符合需求
  "product2": "boolean", // 用户体验符合预期
  "product3": "boolean", // 文案/UI 无误
  "product4": "boolean", // 业务流程验证通过
  "putDate": "string(date-time)", // 上线时间
  "relevanceTest": "boolean", // 关联功能回归测试已完成
  "remark": "string",
  "server1": "boolean", // 预发布环境代码已更新
  "server2": "boolean", // 所有服务（不止1个，多个服务）启动正常
  "server3": "boolean", // 日志无异常报错
  "server4": "boolean", // 配置文件已检查
  "serverDemand": "boolean", // 服务端开发内容符合产品需求
  "serverInfo": "string", // 后端更新内容与额外说明
  "serverTest": "boolean", // 服务端更新模块已逐一测试
  "table1": "boolean", // 已review服务端提供的表结构变更
  "table2": "boolean", // 表结构变更脚本已准备
  "table3": "boolean", // 表结构变更已在预发布环境执行
  "tableInfo": "string", // 表结构涉及更新与额外说明
  "test1": "boolean", // 新功能在预发布环境测试通过
  "test2": "boolean", // 核心流程验证通过
  "test3": "boolean", // 数据准确性验证通过
  "test4": "boolean", // 性能表现符合预期
  "updateBy": "string",
  "updateTime": "string(date-time)",
  "verify1": "boolean", // 新功能验证通过
  "verify10": "boolean", // 产品确认
  "verify2": "boolean", // 核心功能验证通过
  "verify3": "boolean", // 正常流程回归通过
  "verify4": "boolean", // 数据一致性检查通过
  "verify5": "boolean", // 客户端确认
  "verify6": "boolean", // 服务端确认
  "verify7": "boolean", // 运维确认
  "verify8": "boolean", // 前端运维确认
  "verify9": "boolean" // 测试确认
}

