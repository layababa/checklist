# 部署指南

## 开发环境部署

### 前置条件
- Node.js >= 16
- npm 或 yarn

### 部署步骤

1. **克隆或下载项目**
   ```bash
   cd /path/to/checklist
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   - 复制 `.env.example` 到 `.env`（如果没有 `.env` 文件）
   - 或直接编辑 `.env` 文件，确保 `VITE_API_BASE_URL` 指向正确的后端地址

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **访问应用**
   打开浏览器访问 `http://localhost:5173`

---

## 生产环境部署

### 构建步骤

1. **构建应用**
   ```bash
   npm run build
   ```
   构建产物存放在 `dist` 目录下

2. **验证构建**
   ```bash
   npm run preview
   ```
   本地预览构建后的应用，确保没有问题

### 部署到服务器

#### 方案 A：静态文件服务（推荐）

如果使用 Nginx、Apache 或其他静态文件服务器：

1. **上传 dist 文件夹内容到服务器**
   ```bash
   scp -r dist/* user@server:/path/to/web/root/
   ```

2. **Nginx 配置示例**
   ```nginx
   server {
       listen 80;
       server_name example.com;

       root /path/to/web/root;
       index index.html;

       # 路由配置：所有非静态资源请求都返回 index.html
       location / {
           try_files $uri $uri/ /index.html;
       }

       # 静态资源缓存
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
           expires 30d;
           add_header Cache-Control "public, immutable";
       }

       # API 反向代理（如需要）
       location /stage-api/ {
           proxy_pass http://backend-server:8080/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

3. **重启 Nginx**
   ```bash
   sudo nginx -s reload
   ```

#### 方案 B：容器化部署（Docker）

1. **创建 Dockerfile**
   ```dockerfile
   # 构建阶段
   FROM node:18-alpine as builder

   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm install --production=false

   COPY . .
   RUN npm run build

   # 运行阶段
   FROM nginx:alpine

   COPY --from=builder /app/dist /usr/share/nginx/html

   # 配置 Nginx
   RUN rm /etc/nginx/conf.d/default.conf
   COPY nginx.conf /etc/nginx/conf.d/

   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **创建 nginx.conf**
   ```nginx
   server {
       listen 80;
       server_name _;

       root /usr/share/nginx/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
           expires 30d;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

3. **构建 Docker 镜像**
   ```bash
   docker build -t checklist-app:latest .
   ```

4. **运行容器**
   ```bash
   docker run -d \
     --name checklist \
     -p 80:80 \
     -e VITE_API_BASE_URL=http://api.example.com/stage-api \
     checklist-app:latest
   ```

#### 方案 C：云服务部署

##### 部署到 Vercel
```bash
npm install -g vercel
vercel
```

##### 部署到 Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### 环境变量配置

#### 开发环境
编辑 `.env` 文件：
```
VITE_API_BASE_URL=http://localhost:8080/stage-api
```

#### 生产环境
在部署时注入环境变量，或在构建前设置：
```bash
VITE_API_BASE_URL=https://api.example.com/stage-api npm run build
```

或在服务器配置中通过环境文件传递：
```bash
docker run -e VITE_API_BASE_URL=https://api.example.com/stage-api ...
```

### 性能优化

#### 1. 启用 Gzip 压缩（Nginx）
```nginx
gzip on;
gzip_types text/plain text/css application/javascript application/json image/svg+xml;
gzip_min_length 1000;
gzip_comp_level 6;
```

#### 2. 设置缓存策略
```nginx
# HTML 不缓存
location = /index.html {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}

# JS/CSS/图片等资源缓存 30 天
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

#### 3. 启用 CDN（可选）
- 将 `dist` 文件夹上传到 CDN（如阿里 OSS、七牛、CloudFlare 等）
- 通过 CDN 域名访问应用

### 监控与日志

#### Nginx 日志配置
```nginx
access_log /var/log/nginx/checklist-access.log combined;
error_log /var/log/nginx/checklist-error.log warn;
```

#### 查看日志
```bash
# 实时日志
tail -f /var/log/nginx/checklist-access.log

# 错误日志
tail -f /var/log/nginx/checklist-error.log
```

### 健康检查

1. **访问首页**
   ```bash
   curl http://example.com/
   ```
   应返回 HTML 文档

2. **检查 API 连接**
   - 打开应用
   - 点击"查看"某个清单
   - 检查浏览器 Network 标签中 API 请求是否成功

3. **检查登录功能**
   - 点击"登录"按钮
   - 输入测试账号测试登录

### 故障排查

| 问题 | 排查方法 |
|------|--------|
| 打开页面 404 | 检查 Nginx 配置的 `try_files` 指令 |
| API 请求失败 | 检查 `VITE_API_BASE_URL` 是否正确，API 服务是否运行 |
| 样式加载失败 | 检查 CSS 文件路径，确保相对路径正确 |
| 登录失败 | 检查后端认证服务是否正常，API 响应格式是否符合规范 |

### 升级与回滚

#### 升级应用
```bash
# 构建新版本
npm run build

# 备份当前版本（可选）
cp -r /path/to/web/root /path/to/backup/web-root-$(date +%Y%m%d)

# 部署新版本
rsync -av dist/ user@server:/path/to/web/root/
```

#### 回滚到前一个版本
```bash
# 恢复备份
cp -r /path/to/backup/web-root-20240101/* /path/to/web/root/

# 重启服务
sudo systemctl restart nginx
```

---

## 常见问题

### Q: 如何更改 API 地址？
A: 编辑 `.env` 文件中的 `VITE_API_BASE_URL`，然后重新构建：
```bash
npm run build
```

### Q: 应用访问缓慢怎么办？
A: 
1. 启用 Gzip 压缩
2. 启用浏览器缓存
3. 使用 CDN 加速
4. 检查后端 API 响应速度

### Q: 如何监控应用状态？
A: 
1. 实时查看 Nginx 日志
2. 监控服务器资源使用情况（CPU、内存、磁盘）
3. 设置告警规则

### Q: 支持多语言吗？
A: 当前仅中文，后续可扩展国际化功能

---

## 支持

如有部署问题，请参考：
- Nginx 文档：https://nginx.org/
- Docker 文档：https://docs.docker.com/
- Vite 部署指南：https://vitejs.dev/guide/ssr.html

