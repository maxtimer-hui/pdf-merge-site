const en = require('./messages/en.json');
const zh = require('./messages/zh.json');
const zhTw = require('./messages/zh-tw.json');
const es = require('./messages/es.json');
const fr = require('./messages/fr.json');
const de = require('./messages/de.json');
const ar = require('./messages/ar.json');
const pt = require('./messages/pt.json');
const ja = require('./messages/ja.json');
const ko = require('./messages/ko.json');

const mergeKeys = Object.keys(en.merge);
console.log('Total merge keys in en:', mergeKeys.length);
console.log('New keys:', mergeKeys.filter(k => !['title','description','upload','processing','download','success','selectedFiles','moveToStart','moveToEnd','remove','merge','merging','mergeComplete','mergeSuccessDesc','mergeAgain','alertSelectPDF','alertMinTwo','startMerge','mergeSuccess'].includes(k)));

const requiredKeys = ['title','description','upload','processing','download','success','selectedFiles','moveToStart','moveToEnd','remove','merge','merging','mergeComplete','mergeSuccessDesc','mergeAgain','alertSelectPDF','alertMinTwo','startMerge','mergeSuccess','hero','howTo','useCases','seoContent'];

const locales = [
  { name: 'zh', data: zh },
  { name: 'zh-tw', data: zhTw },
  { name: 'es', data: es },
  { name: 'fr', data: fr },
  { name: 'de', data: de },
  { name: 'ar', data: ar },
  { name: 'pt', data: pt },
  { name: 'ja', data: ja },
  { name: 'ko', data: ko }
];

console.log('\nChecking all locales:');
locales.forEach(locale => {
  const hasAllKeys = requiredKeys.every(k => locale.data.merge && locale.data.merge[k] !== undefined);
  const presentKeys = requiredKeys.filter(k => locale.data.merge && locale.data.merge[k] !== undefined).length;
  console.log(`${locale.name}: ${hasAllKeys ? '✅' : '❌'} ${presentKeys}/${requiredKeys.length} keys`);
  if (!hasAllKeys) {
    const missing = requiredKeys.filter(k => !locale.data.merge || locale.data.merge[k] === undefined);
    console.log(`  Missing: ${missing.join(', ')}`);
  }
});
