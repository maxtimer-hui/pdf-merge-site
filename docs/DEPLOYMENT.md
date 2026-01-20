# 部署进度文档

**最后更新**: 2026-01-20
**部署状态**: ✅ 生产环境已上线

---

## 🚀 部署信息

### 生产环境
- **URL**: https://pdf-tools-sepia.vercel.app
- **框架**: Next.js 16.1.2
- **部署平台**: Vercel
- **构建时间**: ~40-60 秒
- **状态**: ✅ 正常运行

### GitHub 仓库
- **URL**: https://github.com/maxtimer-hui/pdf-merge-site
- **分支**: master
- **最后提交**: fix: add error handling for PayPal SDK loading failure

---

## ✅ 已完成的部署步骤

### 1. Git 仓库初始化
**日期**: 2026-01-20

```bash
# 操作记录
git init
git add .
git commit -m "Initial commit: PDF Tools website"
```

**提交内容**:
- 78 个文件
- 18,702 行代码
- 完整的 Next.js 项目

### 2. GitHub 远程仓库配置
**日期**: 2026-01-20

```bash
# SSH 密钥配置
ssh-keygen -t ed25519 -C "maxtimer-hui"

# 添加远程仓库
git remote add origin git@github.com:maxtimer-hui/pdf-merge-site.git

# 推送代码
git push -u origin master
```

**SSH 密钥**: 已添加到 GitHub 账户

### 3. Vercel 部署
**日期**: 2026-01-20

**CLI 安装**:
```bash
npm install -g vercel
vercel login
```

**部署命令**:
```bash
cd pdf-tools
vercel --prod
```

**部署详情**:
- ✅ 自动检测 Next.js 项目
- ✅ 构建命令: `next build`
- ✅ 输出目录: `.next`
- ✅ 生成了 186 个静态页面
- ✅ 所有功能正常

---

## 📦 项目配置

### 环境变量

| 变量名 | 值 | 状态 |
|--------|-----|------|
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | `AXUgVnwkisScIjDxbKK-rVtpbasFLfBgzaALwuIfT18FlH575VeoAc-YqqZI-erIVzojsS4RFUNrrjdj` | ⚠️ Sandbox 模式 |

**注意**: PayPal 当前使用 Sandbox 测试模式

### .gitignore 配置
```
# Dependencies
node_modules

# Build outputs
.next
out
dist
build

# Environment files
.env
.env*.local

# Debug logs
npm-debug.log*
*.log

# IDE
.vscode
.idea
*.swp
*~

# Local Claude files
.claude/settings.local.json
.claude/ralph-loop.local.md
```

---

## ⚠️ 已知问题和解决方案

### 1. PayPal SDK 加载错误

**问题描述**:
- 控制台错误: `Failed to load PayPal SDK`
- PayPal 需要**企业账户**才能启用 Live 模式
- 个人账户只能使用 Sandbox 测试模式

**影响**:
- 捐赠页面无法显示真实的 PayPal 按钮
- 其他 PDF 工具功能完全正常

**解决方案**:
- ✅ 已添加错误处理
- ✅ SDK 加载失败时显示友好提示
- ✅ 不影响页面其他功能

**代码修改**:
```typescript
// pdf-tools/app/[locale]/donate/DonateClient.tsx
const [sdkLoadError, setSdkLoadError] = useState(false);

script.onerror = () => {
  console.error('Failed to load PayPal SDK');
  setSdkLoadError(true);
};

// UI 显示
{sdkLoadError ? (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
    <p>⚠️ PayPal SDK 加载失败，请稍后再试</p>
  </div>
) : (
  // 正常显示 PayPal 按钮
)}
```

### 2. PayPal 企业账户要求

**问题**: PayPal 个人账户无法接收真实支付

**限制**:
- ❌ 个人账户: 只能使用 Sandbox 测试模式
- ✅ 企业账户: 可以接收真实支付

**替代方案**:
1. **微信/支付宝收款码** - 个人可用，0 手续费
2. **Buy Me a Coffee** - 个人友好，国际用户
3. **GitHub Sponsors** - 适合开源项目
4. **暂时移除捐赠功能** - 等决定后再添加

---

## 🔄 部署流程

### 日常部署流程

```bash
# 1. 修改代码
# ... 进行修改 ...

# 2. 提交到 Git
git add .
git commit -m "描述信息"

# 3. 推送到 GitHub
git push

# 4. 部署到 Vercel
cd pdf-tools
vercel --prod
```

### 自动部署（可选）

如需启用 GitHub 自动部署：

```bash
cd pdf-tools
vercel link
```

然后每次推送到 GitHub 主分支时，Vercel 会自动部署。

---

## 📊 部署统计

### 项目规模
- **文件数量**: 78 个
- **代码行数**: 18,702 行
- **工具数量**: 11 个 PDF 工具
- **语言数量**: 10 种语言
- **静态页面**: 186 个

### 构建信息
- **构建时间**: ~40 秒
- **部署时间**: ~60 秒
- **总耗时**: ~2 分钟

### 技术栈
- **框架**: Next.js 16.1.2 (Turbopack)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **国际化**: next-intl
- **PDF 处理**: pdf-lib
- **托管**: Vercel

---

## 🛠️ Vercel CLI 常用命令

| 命令 | 说明 |
|------|------|
| `vercel login` | 登录 Vercel 账户 |
| `vercel --prod` | 部署到生产环境 |
| `vercel` | 部署到预览环境 |
| `vercel logs` | 查看实时日志 |
| `vercel env ls` | 列出环境变量 |
| `vercel env add <name>` | 添加环境变量 |
| `vercel inspect <url>` | 检查部署详情 |
| `vercel domains` | 管理自定义域名 |

---

## 🌐 域名配置（可选）

### 自定义域名设置

1. **在 Vercel 添加域名**:
   - 访问: https://vercel.com/maxtimer-huis-projects/pdf-tools/settings/domains
   - 点击 "Add"
   - 输入您的域名（如 `pdf-tools.com`）

2. **配置 DNS**:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   或

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **等待 DNS 传播**（通常 24-48 小时）

---

## 📝 部署检查清单

### 新部署前检查
- [ ] 代码已提交到 Git
- [ ] 所有测试通过
- [ ] 环境变量已配置
- [ ] .gitignore 已更新（排除敏感文件）
- [ ] 构建成功（`npm run build`）

### 部署后验证
- [ ] 网站可以访问
- [ ] 所有页面正常加载
- [ ] PDF 工具功能正常
- [ ] 多语言切换正常
- [ ] 移动端显示正常
- [ ] 无控制台错误

---

## 🔧 故障排查

### 问题 1: 构建失败
**检查**:
- Node.js 版本是否正确（v22.2.0）
- 依赖是否完整安装（`npm install`）
- TypeScript 错误

**解决**:
```bash
cd pdf-tools
npm install
npm run build
```

### 问题 2: 部署成功但无法访问
**检查**:
- Vercel 部署状态
- 域名 DNS 配置
- Vercel 日志

**解决**:
```bash
vercel logs
vercel inspect <deployment-url>
```

### 问题 3: 环境变量未生效
**检查**:
- 环境变量是否在 Vercel Dashboard 中设置
- 变量名是否正确（`NEXT_PUBLIC_` 前缀）
- 是否重新部署

**解决**:
```bash
vercel env add NEXT_PUBLIC_PAYPAL_CLIENT_ID production
vercel --prod
```

---

## 📈 监控和分析

### 推荐工具
- **Vercel Analytics**: 内置性能分析
- **Google Analytics 4**: 用户行为分析
- **Google Search Console**: SEO 监控
- **Vercel Logs**: 实时错误日志

### Vercel Dashboard
- **URL**: https://vercel.com/maxtimer-huis-projects/pdf-tools
- **功能**:
  - 查看部署历史
  - 监控性能
  - 查看日志
  - 管理环境变量
  - 配置域名

---

## 🎯 下一步计划

### 短期（1-2 周）
- [ ] 决定支付替代方案
- [ ] 添加 Google Analytics 4
- [ ] 提交到 Google Search Console
- [ ] 配置自定义域名（可选）

### 中期（1-2 月）
- [ ] 性能优化
- [ ] 外链建设
- [ ] 内容营销
- [ ] 社交媒体推广

### 长期（3-6 月）
- [ ] 添加更多 PDF 工具
- [ ] 移动端优化
- [ ] A/B 测试
- [ ] 用户反馈系统

---

**文档维护**: 请在每次部署后更新此文档
**最后更新**: 2026-01-20
**部署状态**: ✅ 生产环境正常运行
