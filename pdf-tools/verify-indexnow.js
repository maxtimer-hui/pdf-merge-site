const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('IndexNow 集成验证');
console.log('========================================\n');

// 检查文件是否存在
const files = [
  { path: 'lib/indexnow.ts', name: '核心库' },
  { path: 'app/api/indexnow/route.ts', name: 'API 路由' },
  { path: 'public/e528b0165e56992a3b9cf8e98d169fa1.txt', name: 'API Key 文件' },
  { path: 'docs/INDEXNOW_GUIDE.md', name: '使用指南' },
  { path: 'examples/indexnow-usage.ts', name: '使用示例' },
  { path: 'test-indexnow.js', name: '测试脚本' }
];

let allExist = true;

files.forEach(file => {
  const fullPath = path.join(process.cwd(), file.path);
  const exists = fs.existsSync(fullPath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${file.name}: ${file.path}`);

  if (!exists) allExist = false;
});

console.log();

// 检查 key 文件内容
const keyFilePath = path.join(process.cwd(), 'public/e528b0165e56992a3b9cf8e98d169fa1.txt');
if (fs.existsSync(keyFilePath)) {
  const keyContent = fs.readFileSync(keyFilePath, 'utf-8').trim();
  console.log('🔑 API Key 文件内容:', keyContent);

  if (keyContent === 'e528b0165e56992a3b9cf8e98d169fa1') {
    console.log('✅ Key 内容正确\n');
  } else {
    console.log('❌ Key 内容不匹配\n');
  }
}

// 检查环境变量
console.log('📋 环境变量检查:');
const envLocal = fs.readFileSync('.env.local', 'utf-8');
if (envLocal.includes('INDEXNOW_API_KEY')) {
  console.log('✅ .env.local 包含 INDEXNOW_API_KEY');
} else {
  console.log('❌ .env.local 缺少 INDEXNOW_API_KEY');
}

console.log();

// 检查 API 路由配置
console.log('📡 API 端点:');
console.log('   - GET  /api/indexnow  (检查状态)');
console.log('   - POST /api/indexnow  (提交 URL)');
console.log();

console.log('========================================');
if (allExist) {
  console.log('✅ 所有文件已创建');
  console.log('✅ IndexNow 集成完成');
  console.log();
  console.log('📚 查看文档: docs/INDEXNOW_GUIDE.md');
  console.log('📝 查看示例: examples/indexnow-usage.ts');
  console.log('🧪 运行测试: node test-indexnow.js');
} else {
  console.log('⚠️  部分文件缺失');
}
console.log('========================================');
