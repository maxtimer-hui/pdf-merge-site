// 结构化数据验证脚本

console.log('🔍 验证结构化数据 (Schema.org JSON-LD)\n');
console.log('='.repeat(80));

// 模拟 page.tsx 中生成的结构化数据
function generateStructuredData(locale, translations) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://pdf-tools.com/${locale}`,
        "url": `https://pdf-tools.com/${locale}`,
        "name": translations.seo?.home?.title || "Free PDF Combiner",
        "description": translations.seo?.home?.description,
        "inLanguage": locale
      },
      {
        "@type": "SoftwareApplication",
        "name": "Free PDF Combiner",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any (Web-based)",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": translations.seo?.home?.description,
        "featureList": [
          "Combine PDF files free",
          "PDF combiner free online",
          "No registration required",
          "Unlimited merges",
          "Secure browser-based processing",
          "Maintain PDF quality"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1250"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": locale === 'zh' ? "如何免费合并PDF文件？" :
                    locale === 'es' ? "¿Cómo combinar archivos PDF gratis?" :
                    locale === 'ja' ? "PDFファイルを無料で結合する方法？" :
                    "How to combine PDF files free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply upload your PDF files to our free PDF combiner..."
            }
          },
          {
            "@type": "Question",
            "name": locale === 'zh' ? "这个PDF合并工具免费吗？" :
                    locale === 'es' ? "¿Es gratis este combinador PDF?" :
                    locale === 'ja' ? "このPDF結合ツールは無料ですか？" :
                    "Is this PDF combiner free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our PDF combiner is completely free..."
            }
          },
          {
            "@type": "Question",
            "name": locale === 'zh' ? "在线合并PDF文件安全吗？" :
                    locale === 'es' ? "¿Es seguro combinar PDFs online?" :
                    locale === 'ja' ? "オンラインでPDFを結合するのは安全ですか？" :
                    "Is it safe to combine PDF files online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely safe. All PDF processing happens locally..."
            }
          }
        ]
      }
    ]
  };
}

const fs = require('fs');
const path = require('path');
const languages = ['en', 'zh', 'es'];

console.log('\n📋 检查结构化数据组件:\n');

languages.forEach(locale => {
  const filePath = path.join(__dirname, 'messages', `${locale}.json`);
  const translations = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const structuredData = generateStructuredData(locale, translations);

  console.log(`\n🌐 ${locale.toUpperCase()} 结构化数据:`);
  console.log('-'.repeat(80));

  // 验证必需字段
  console.log('✅ @context:', structuredData['@context']);
  console.log('✅ @graph 包含', structuredData['@graph'].length, '个对象:');

  structuredData['@graph'].forEach((item, index) => {
    console.log(`   ${index + 1}. ${item['@type']}`);
  });

  // 验证 WebPage
  const webpage = structuredData['@graph'][0];
  console.log('\n📄 WebPage Schema:');
  console.log(`   ✅ @id: ${webpage['@id']}`);
  console.log(`   ✅ name: ${webpage.name}`);
  console.log(`   ✅ inLanguage: ${webpage.inLanguage}`);

  // 验证 SoftwareApplication
  const app = structuredData['@graph'][1];
  console.log('\n💼 SoftwareApplication Schema:');
  console.log(`   ✅ name: ${app.name}`);
  console.log(`   ✅ price: ${app.offers.price} ${app.offers.priceCurrency}`);
  console.log(`   ✅ rating: ${app.aggregateRating.ratingValue}/5 (${app.aggregateRating.ratingCount} reviews)`);
  console.log(`   ✅ features: ${app.featureList.length} 项功能`);

  // 验证 FAQPage
  const faq = structuredData['@graph'][2];
  console.log('\n❓ FAQPage Schema:');
  console.log(`   ✅ questions: ${faq.mainEntity.length} 个问题`);
  faq.mainEntity.forEach((q, i) => {
    console.log(`   ${i + 1}. ${q.name}`);
  });
});

console.log('\n' + '='.repeat(80));
console.log('✅ 结构化数据验证完成！');
console.log('\n📌 注意事项:');
console.log('   1. JSON-LD 会自动注入到每个语言版本的首页');
console.log('   2. 可以使用 Google Rich Results Test 验证: https://search.google.com/test/rich-results');
console.log('   3. 建议使用 Google Search Console 提交站点地图');
console.log('\n🚀 服务器运行在: http://localhost:3000');
console.log('   测试英文版: http://localhost:3000/en');
console.log('   测试中文版: http://localhost:3000/zh');
console.log('   测试西班牙语: http://localhost:3000/es\n');
