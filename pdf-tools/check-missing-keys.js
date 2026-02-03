const en = require('./messages/en.json');
const es = require('./messages/es.json');

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function hasKey(obj, keyPath) {
  const parts = keyPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (!current || !current.hasOwnProperty(part)) return false;
    current = current[part];
  }
  return true;
}

const enKeys = getAllKeys(en);
const esKeys = getAllKeys(es);
const missing = enKeys.filter(k => !hasKey(es, k));

console.log('Missing keys for Spanish (es):');
console.log('Total:', missing.length);
missing.forEach(k => console.log('  -', k));
