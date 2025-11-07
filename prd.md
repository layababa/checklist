## 项目名称：发布前发版确认清单（checklist）

### 1. 背景与目标
- 建立统一、可追踪的发布前确认闭环，覆盖测试环境、预发布、生产流程与全员确认，支持免登录查看与登录后分角色提交。
- 满足“点击即提交、提交即锁定”的不可逆规则，避免发布过程中责任不清与信息缺失。

### 2. 用户与角色
- 角色编码与域：
  - 产品：role=0，域 `chanpin`
  - 测试：role=1，域 `ceshi`
  - 前端（含前端运维）：role=2，域 `qianduan`
  - 后端（含运维）：role=3，域 `houduan`
- 账号与角色：一个账号仅一种角色（不存在多角色账号）；同一角色可有多个账号。

### 3. 页面与路由
- 页面：
  - checklists（确认清单列表）：`/checklists`
  - onechecklist（单次确认清单）：`/checklists/:id`
- 登录方式：两个页面均提供登录弹框入口（顶部“登录”按钮）；免登录可查看，但进行任何提交/修改时触发登录。

### 4. 信息架构与字段分区（沿用 index.vue 分组）
1) 更新内容
  - 上线时间 `putDate`（产品填写）
  - 前端更新内容与额外说明 `frontInfo`
  - 后端更新内容与额外说明 `serverInfo`
  - 表结构涉及更新与额外说明 `tableInfo`
2) 测试环境确认
  - 产品确认：`demand`、`prd`、`frontDemand`、`serverDemand`
  - 测试确认：`frontTest`、`serverTest`
  - 回归测试：`coreTest`、`relevanceTest`、`bugTest`
3) 预发布流程确认
  - 运维确认（后端/运维）：`table1`、`table2`、`table3`
  - 服务端部署（后端/运维）：`server1`、`server2`、`server3`、`server4`
  - 前端部署（前端/前端运维）：`front1`、`front2`、`front3`、`front4`
  - 测试验收（测试）：`test1`、`test2`、`test3`、`test4`
  - 产品验收（产品）：`product1`、`product2`、`product3`、`product4`
4) 生产流程确认
  - 运维发布（后端/运维）：`prod1`、`prod2`、`prod3`、`prod4`、`prod5`、`prod6`
  - 前端运维发布（前端/前端运维）：`prod7`、`prod8`、`prod9`、`prod10`
  - 测试功能验证（测试）：`verify1`、`verify2`、`verify3`、`verify4`
  - 全员确认：
    - 前端：`verify5`
    - 后端：`verify6`
    - 运维：`verify7`
    - 前端运维：`verify8`
    - 测试：`verify9`
    - 产品：`verify10`

### 5. 可编辑归属与权限
- 产品可编辑：`demand`、`prd`、`frontDemand`、`serverDemand`、`product1-4`、`verify10`、`putDate`
- 测试可编辑：`frontTest`、`serverTest`、`coreTest`、`relevanceTest`、`bugTest`、`test1-4`、`verify1-4`、`verify9`
- 前端（含前端运维）可编辑：`front1-4`、`prod7-10`、`verify5`、`verify8`、`frontInfo`
- 后端（含运维）可编辑：`table1-3`、`server1-4`、`prod1-6`、`verify6`、`verify7`、`serverInfo`、`tableInfo`
- 规则：仅当前登录角色可编辑其归属区域，其它区域始终禁用（hover 显示“无权限编辑”提示）。

### 6. 交互与锁定规则
- 控件类型：
  - 布尔项采用 Switch（开关）。
  - 文本说明采用 Textarea，右侧放置“确定”按钮；`putDate` 使用 DatePicker，右侧放置“确定”按钮。
- 提交流程：
  - 免登录可查看；首次点击任一可编辑控件时触发登录弹框；登录成功后继续提交。
  - “点击即提交”：每次操作即时调用后端接口提交变更。
  - 锁定策略（由后端持久化）：
    - 布尔项：一旦从 false→true 提交成功，即不可再改回（不可逆）。
    - 文本/日期项：首次点击“确定”提交成功后即锁定，不可再更改。
  - 前端行为：提交成功后立即禁用该控件；失败时回退 UI 状态并提示错误。
  - 不需要二次确认弹框。

### 7. 列表页（/checklists）
- 视图要素：
  - 顶部：登录按钮、筛选区（上线日期范围、关键字）。
  - 列表列：`id`、`putDate`、四大角色完成度（产品/测试/前端/后端：各自布尔项完成率%）、`createTime`、`updateTime`、操作（查看）。
  - 新建入口：顶部“新建清单”按钮（登录后可见，默认任何登录用户可新建；创建后仅能编辑自身角色区域）。
- 分页/数据：
  - 调用 `GET /system/workflow/list?pageNum&pageSize`；以 `api.md` 为准（`code=0`，`data=[]`）。若无 `total` 字段，前端以 `data.length` 显示总数。

### 8. 详情页（/checklists/:id）
- 结构：按“更新内容 / 测试环境确认 / 预发布流程确认 / 生产流程确认 / 全员确认”分组呈现。
- 可编辑：仅本角色区域为可编辑；其他区域禁用（hover 提示）。
- 提交：
  - Switch：切换为 true 立即提交；成功后禁用该开关。
  - 文本/日期：点击右侧“确定”按钮后提交；成功后禁用输入与按钮。

### 9. 数据模型（主要字段）
- 标识与元信息：`id`、`createBy`、`createTime`、`updateBy`、`updateTime`、`remark`
- 更新内容：`frontInfo`、`serverInfo`、`tableInfo`、`putDate`
- 产品确认：`demand`、`prd`、`frontDemand`、`serverDemand`、`product1-4`、`verify10`
- 测试：`frontTest`、`serverTest`、`coreTest`、`relevanceTest`、`bugTest`、`test1-4`、`verify1-4`、`verify9`
- 前端：`front1-4`、`prod7-10`、`verify5`、`verify8`
- 后端/运维：`table1-3`、`server1-4`、`prod1-6`、`verify6`、`verify7`

### 10. API 协议（以 api.md 为准）
- 基础地址：可通过环境变量配置，默认 `http://web.flimzor.xyz/stage-api`。
- 登录
  - `POST /login`，请求：`{ username, password }`
  - 响应：`{ code:200, msg, token, role }`（示例中为 200；列表接口为 `code:0`，前端兼容两种成功码）
  - 401 视为 token 过期/无效，触发登录弹框。
- 列表
  - `GET /system/workflow/list?pageNum=1&pageSize=10`
  - 响应：`{ code:0, data:[ {...清单对象} ], msg }`
- 新增
  - `POST /system/workflow`，请求体参照 api.md 完整对象；新建后默认各项未完成/未锁定。
- 修改
  - `PUT /system/workflow`，推荐最小化提交：`{ id, <被修改字段> }`。
  - 后端负责字段锁定与越权校验：提交已锁定字段或非本角色字段应返回错误码与提示。

### 11. 状态与权限校验
- 前端：基于 `role` 控制区域可编辑性；基于字段值（布尔 true、文本非空、日期已填）做禁用展示。
- 后端：强一致性校验（字段锁定、角色权限、不可逆规则）。

### 12. 校验与必填
- `putDate`：产品填写，格式 `yyyy-MM-dd`（前端 date-picker 控件 value-format 可设为 `yyyy-MM-dd`）。
- 整体完成门槛：不强制所有字段完成后才能使用系统；系统仅作为事实记录与确认闭环。

### 13. 错误与异常处理
- 401：弹出登录并在成功后重试当前操作。
- 4xx/5xx：Toast 错误提示；布尔开关回退为原状态，按钮恢复可点。
- 并发/重复点击：后端幂等；前端提交中局部 loading 与禁用态。

### 14. 安全与存储
- Token 存储：`localStorage`；请求时携带 `Authorization: Bearer <token>`。
- CORS：由后端开启；前端无需额外处理。

### 15. 非功能与兼容
- 技术栈：Vue 3 + Element Plus + Vite；TypeScript 可选。
- 响应式：需移动端适配（两列改单列、控件尺寸适配）。
- 性能：列表懒加载/分页；接口失败重试可选（不强制）。
- 国际化：中文文案。
- 审计/日志：不做按字段粒度记录；以全局 `createBy/updateBy/updateTime` 为准。

### 16. 组件与交互要点
- 登录弹框：
  - 主动入口按钮；在提交时按需触发。
  - 成功后刷新用户态与权限展示。
- 可编辑控件：
  - Switch：仅允许 false→true；true 后禁用。
  - Textarea/Date：旁“确定”按钮；首次提交成功后整体禁用。
  - 非本角色：禁用 + hover 气泡提示。

### 17. 里程碑与验收
- M1：页面骨架（两页 & 路由 & 登录弹框 & 列表查询 & 详情展示）
- M2：分角色可编辑与点击即提交、字段锁定联动
- M3：移动端适配、筛选与完成度汇总
- 验收标准：
  - 免登录可查看；登录后仅能编辑本角色区域。
  - 任一字段提交后立即禁用；刷新后仍保持禁用（后端锁定生效）。
  - API 交互符合 `api.md`；401 能触发登录重试；错误回退 UI。

