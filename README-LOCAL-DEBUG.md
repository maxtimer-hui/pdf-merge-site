# 本地调试PayPal支付

## 方法1: 使用 ngrok (推荐)

### 步骤1: 下载 ngrok
1. 访问 https://ngrok.com/download
2. 下载Windows版本
3. 解压到任意目录

### 步骤2: 启动 ngrok
```bash
# 在命令行中运行
ngrok http 3000
```

你会看到:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:3000
```

### 步骤3: 使用 ngrok URL 测试
1. 复制 ngrok 给你的HTTPS URL (例如 https://abc123.ngrok.io)
2. 在浏览器访问: `https://abc123.ngrok.io/zh/donate`
3. 测试PayPal支付 - 现在应该可以正常工作了!

### 步骤4: 查看 PayPal 日志
- PayPal Dashboard → Sandbox → Activity
- 应该能看到交易记录

---

## 方法2: 修改 Hosts 文件

### 添加本地域名
1. 以管理员身份打开 `C:\Windows\System32\drivers\etc\hosts`
2. 添加一行:
```
127.0.0.1  localtest.dev
```
3. 保存文件
4. 访问 `http://localtest.dev:3000/zh/donate`
5. 在PayPal Dashboard添加这个URL到允许列表

---

## 方法3: 使用 PayPal 的 Card 测试(无需登录)

如果你有PayPal Business账号,可以启用"Card Payments"功能,这样用户可以直接输入信用卡,不需要弹窗。

但这需要:
1. PayPal Business账号
2. 启用 Advanced Card Payments
3. 额外的KYC验证

---

## 推荐流程:

**最简单的是使用 ngrok:**

1. 下载并启动 ngrok
2. 访问 ngrok 提供的 HTTPS URL
3. 测试PayPal支付
4. 在PayPal Dashboard查看交易记录

这样就可以在本地完整测试支付流程了!
