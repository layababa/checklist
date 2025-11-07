# 📁 项目文件清单

## 根目录文件

| 文件 | 说明 |
|------|------|
| `package.json` | npm 依赖与脚本配置 |
| `vite.config.ts` | Vite 打包器配置 |
| `tsconfig.json` | TypeScript 编译配置 |
| `tsconfig.node.json` | Vite 配置文件的 TS 配置 |
| `index.html` | HTML 入口文件 |
| `.gitignore` | Git 忽略规则 |

## 文档文件

| 文件 | 用途 |
|------|------|
| `README.md` | 📖 完整项目文档（功能说明、安装、使用指南、常见问题） |
| `QUICKSTART.md` | 🚀 快速启动指南（三步即可运行） |
| `DEPLOYMENT.md` | 🚢 部署指南（开发、生产、Docker、云服务部署） |
| `PROJECT_SUMMARY.md` | ✅ 项目完成总结（工作清单、架构、代码统计） |
| `prd.md` | 📋 产品需求文档 |
| `api.md` | 🔌 API 接口规范 |
| `qa.md` | ❓ 需求澄清与答疑 |
| `FILE_MANIFEST.md` | 📄 本文件清单 |

## 源代码目录 (src/)

### 入口文件
```
src/
├── main.ts              # 应用入口，初始化 Vue、Pinia、路由、Element Plus
└── App.vue              # 根组件，包含顶部导航、登录、路由容器
```

### 路由管理 (router/)
```
router/
└── index.ts             # 路由配置，定义 /checklists 与 /checklists/:id 两个路由
```

### 状态管理 (stores/)
```
stores/
└── auth.ts              # Pinia store：token、userRole、登录/登出、isLoggedIn 计算属性
```

### API 通信 (api/)
```
api/
├── http.ts              # Axios 实例、拦截器、401 处理、Authorization 头
└── workflow.ts          # 业务接口：login、list、create、read、update、delete
```

### 页面 (pages/)
```
pages/
├── Checklists.vue       # 清单列表页
│                        # ├─ 筛选区（日期范围、关键字）
│                        # ├─ 表格（id、上线时间、四栏进度、时间戳）
│                        # ├─ 分页
│                        # ├─ 新建清单对话框
│                        # └─ 跳转详情页
│
└── OneChecklist.vue     # 清单详情页
                         # ├─ 顶部信息（id、时间戳、返回按钮）
                         # ├─ 📝 更新内容（4个字段）
                         # ├─ 🧪 测试环境确认（12个项目）
                         # ├─ 📦 预发布流程确认（19个项目）
                         # └─ 🚀 生产流程确认（17个项目）
```

### 组件 (components/)
```
components/
├── LoginDialog.vue              # 登录弹框
│                                # ├─ 账号/密码输入
│                                # ├─ 登录请求与错误处理
│                                # └─ token/role 存储
│
├── RoleLockSwitch.vue           # 角色权限开关
│                                # ├─ 权限检查
│                                # ├─ 锁定状态检查
│                                # ├─ 不可逆操作（false→true 后禁用）
│                                # ├─ 即时 PUT 请求
│                                # └─ 禁用提示
│
├── ConfirmableTextarea.vue      # 可确认文本域
│                                # ├─ 权限检查与锁定
│                                # ├─ 确定按钮
│                                # ├─ 即时提交
│                                # └─ "✓ 已确认"标签
│
└── ConfirmableDate.vue          # 可确认日期选择
                                 # ├─ 权限检查与锁定
                                 # ├─ 确定按钮
                                 # ├─ 即时提交
                                 # └─ "✓ 已确认"标签
```

### 工具函数 (utils/)
```
utils/
├── role.ts                      # 角色权限工具
│                                # ├─ ROLES 常量定义
│                                # ├─ getRoleName() 角色名称映射
│                                # ├─ canEditField() 权限检查
│                                # └─ getRolePermissions() 获取权限域
│
└── fields.ts                    # 字段分组与锁定工具
                                 # ├─ fieldGroups 字段分组定义
                                 # ├─ getProgressByRole() 进度计算
                                 # ├─ isFieldLocked() 锁定检查
                                 # ├─ getFieldLabel() 获取字段标签
                                 # └─ 各角色可编辑字段映射
```

### 样式 (styles/)
```
styles/
└── global.css                   # 全局 CSS 样式
                                 # ├─ 基础样式重置
                                 # ├─ 布局类（flex、grid）
                                 # ├─ 组件类（section、card）
                                 # ├─ 响应式媒体查询
                                 # └─ 移动端适配
```

## 文件统计

### 代码文件
- 入口文件：2 个（main.ts、App.vue）
- 页面组件：2 个（Checklists.vue、OneChecklist.vue）
- 功能组件：4 个（LoginDialog、RoleLockSwitch、ConfirmableTextarea、ConfirmableDate）
- 工具模块：2 个（role.ts、fields.ts）
- API 模块：2 个（http.ts、workflow.ts）
- 状态管理：1 个（auth.ts）
- 路由配置：1 个（router/index.ts）
- 样式文件：1 个（global.css）
- 配置文件：4 个（vite.config.ts、tsconfig.json、tsconfig.node.json、package.json）

**合计代码文件：19 个**

### 文档文件
- 项目文档：2 个（README.md、PROJECT_SUMMARY.md）
- 快速指南：1 个（QUICKSTART.md）
- 部署指南：1 个（DEPLOYMENT.md）
- 产品文档：1 个（prd.md）
- API 文档：1 个（api.md）
- 需求文档：1 个（qa.md）
- 清单文档：1 个（FILE_MANIFEST.md）

**合计文档文件：8 个**

## 代码行数统计

| 文件类型 | 数量 | 平均行数 |
|---------|------|---------|
| Vue 组件 | 6 | ~200 行 |
| TypeScript 文件 | 6 | ~150 行 |
| CSS | 1 | ~300 行 |
| 配置文件 | 4 | ~50 行 |
| 文档 | 8 | ~200 行 |

**预估总代码行数：~3000-4000 行**

## 关键交互路径

### 首次使用
1. 访问 `/checklists` - 列表页（无需登录）
2. 点击"新建清单" - 触发登录
3. 登录成功 - 创建清单
4. 自动跳转 `/checklists/:id` - 详情页
5. 点击可编辑项 - 即时提交
6. 提交成功 - 字段禁用

### 日常使用
1. 访问 `/checklists` - 查看清单列表
2. 点击"查看" - 进入详情页
3. 登录（如需编辑）
4. 编辑本角色相关项
5. 返回列表 - 查看进度更新

## 部署清单

### 前置条件检查
- [ ] Node.js >= 16 已安装
- [ ] npm 或 yarn 已安装
- [ ] 后端 API 服务正常运行
- [ ] 数据库连接正常
- [ ] API 端口开放与配置正确

### 本地开发部署
- [ ] `npm install` 依赖安装成功
- [ ] `.env` 文件配置正确（或使用默认地址）
- [ ] `npm run dev` 启动无错误
- [ ] 浏览器能访问 `http://localhost:5173`
- [ ] 能正常登录与操作

### 生产环境部署
- [ ] `npm run build` 构建成功，产物在 `dist` 目录
- [ ] `npm run preview` 预览正常
- [ ] 上传 `dist` 文件到服务器
- [ ] Nginx/Apache 配置正确（特别是 SPA 路由转发）
- [ ] `.env` 环境变量指向正确的后端地址
- [ ] HTTPS 证书配置（生产环境强制 HTTPS）
- [ ] CORS 跨域设置正确
- [ ] 日志路径与权限配置
- [ ] 健康检查通过

## 常用命令

```bash
# 开发
npm install                 # 安装依赖
npm run dev                # 启动开发服务器
npm run preview            # 预览构建结果

# 构建
npm run build              # 构建生产版本
npm run build:analyze      # 构建并分析大小（需配置插件）

# 其他
npm run lint               # 代码检查（需配置 ESLint）
npm run type-check         # TypeScript 类型检查
```

## 后续维护

### 定期检查
- [ ] npm 依赖更新检查（`npm outdated`）
- [ ] 安全漏洞扫描（`npm audit`）
- [ ] 代码质量检查（使用 SonarQube 或类似工具）
- [ ] 性能监控（Page Speed、lighthouse）

### 文档维护
- [ ] 功能更新时同步 README.md
- [ ] API 变更时同步 api.md
- [ ] 部署变更时同步 DEPLOYMENT.md
- [ ] 每个大版本发布时更新 PROJECT_SUMMARY.md

### 代码维护
- [ ] 定期重构过大的组件
- [ ] 提取公用逻辑到 utils
- [ ] 优化网络请求（防抖、缓存）
- [ ] 监控用户反馈和错误日志

---

**最后更新时间**：2025年11月6日
**项目版本**：1.0.0
**状态**：✅ 开发完成，可进入测试与部署阶段

