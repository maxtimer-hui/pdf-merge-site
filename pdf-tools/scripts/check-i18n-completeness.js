const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');
const enFile = path.join(messagesDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

function countKeys(obj, prefix = '') {
  let count = 0;
  for (const key in obj) {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      count += countKeys(obj[key], prefix + key + '.');
    } else {
      count++;
    }
  }
  return count;
}

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], prefix + key + '.'));
    } else {
      keys.push(prefix + key);
    }
  }
  return keys;
}

const enKeys = getAllKeys(enData).sort();
console.log(`\n📊 i18n Completeness Report`);
console.log(`==========================\n`);
console.log(`English (baseline): ${enKeys.length} keys\n`);

const locales = ['zh', 'zh-tw', 'es', 'fr', 'de', 'ar', 'pt', 'ja', 'ko'];

locales.forEach(locale => {
  const localeFile = path.join(messagesDir, `${locale}.json`);
  if (!fs.existsSync(localeFile)) {
    console.log(`❌ ${locale}: File not found`);
    return;
  }

  const localeData = JSON.parse(fs.readFileSync(localeFile, 'utf8'));
  const localeKeys = getAllKeys(localeData).sort();

  const missingKeys = enKeys.filter(key => !localeKeys.includes(key));
  const extraKeys = localeKeys.filter(key => !enKeys.includes(key));

  const completeness = ((localeKeys.length / enKeys.length) * 100).toFixed(1);

  console.log(`${locale}:`);
  console.log(`  ✅ Keys: ${localeKeys.length}/${enKeys.length} (${completeness}%)`);

  if (missingKeys.length > 0) {
    console.log(`  ⚠️  Missing: ${missingKeys.length} keys`);
    if (missingKeys.length <= 10) {
      missingKeys.forEach(key => console.log(`     - ${key}`));
    } else {
      missingKeys.slice(0, 5).forEach(key => console.log(`     - ${key}`));
      console.log(`     ... and ${missingKeys.length - 5} more`);
    }
  }

  if (extraKeys.length > 0) {
    console.log(`  ➕ Extra: ${extraKeys.length} keys`);
  }

  if (missingKeys.length === 0 && extraKeys.length === 0) {
    console.log(`  🎉 Complete!`);
  }

  console.log('');
});

console.log(`\n✨ Run 'npm run check-i18n' to verify translations\n`);
