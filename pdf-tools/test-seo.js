const fs = require('fs');
const path = require('path');

const languages = ['en', 'zh', 'es', 'ja', 'de', 'fr', 'pt', 'ar', 'ko', 'zh-tw'];

console.log('🔍 验证所有语言版本的 SEO 配置\n');
console.log('='.repeat(80));

let allPassed = true;

languages.forEach(lang => {
  const filePath = path.join(__dirname, 'messages', `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  console.log(`\n📄 语言: ${lang.toUpperCase()}`);
  console.log('-'.repeat(80));

  // 检查 home SEO
  if (data.seo.home) {
    console.log('✅ Home SEO:');
    console.log(`   Title: ${data.seo.home.title}`);
    console.log(`   Description: ${data.seo.home.description.substring(0, 100)}...`);
    console.log(`   Keywords: ${data.seo.home.keywords.split(',').length} 个关键词`);
  } else {
    console.log('❌ 缺少 home SEO 配置');
    allPassed = false;
  }

  // 检查 appName 和 tagline
  console.log('\n✅ 页面文案:');
  console.log(`   appName: ${data.common.appName}`);
  console.log(`   tagline: ${data.common.tagline}`);

  // 检查 seoContent
  if (data.common.seoContent) {
    console.log('\n✅ SEO 内容区域:');
    console.log(`   title: ${data.common.seoContent.title}`);
    console.log(`   subtitle: ${data.common.seoContent.subtitle}`);
    console.log(`   包含 ${Object.keys(data.common.seoContent).length} 个字段`);
  } else {
    console.log('\n❌ 缺少 seoContent 配置');
    allPassed = false;
  }

  // 检查关键词覆盖
  const homeText = `${data.seo.home?.title} ${data.seo.home?.description} ${data.seo.home?.keywords}`.toLowerCase();
  const keywords = ['combine', 'combiner', 'free', 'pdf'];
  const foundKeywords = keywords.filter(kw => homeText.includes(kw));

  console.log('\n🔑 关键词覆盖:');
  console.log(`   找到 ${foundKeywords.length}/${keywords.length} 个核心关键词`);
});

console.log('\n' + '='.repeat(80));

if (allPassed) {
  console.log('✅ 所有语言版本验证通过！');
} else {
  console.log('❌ 部分语言版本缺少配置');
}

// 生成测试 URL
console.log('\n\n🌐 测试 URL:\n');
languages.forEach(lang => {
  console.log(`   ${lang.padEnd(6)} → http://localhost:3000/${lang}`);
});

console.log('\n');
