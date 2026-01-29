const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app');
const componentsDir = path.join(__dirname, '../components');

// Common hardcoded string patterns
const patterns = [
  // JSX content strings
  />([^<>\n]{10,})</g,
  // String literals that look like user-facing text
  /['"]([A-Z][a-z]+(\s+[a-z]+){1,3})['"]/g,
];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];

  // Skip files that are allowed to have strings
  if (filePath.includes('node_modules') ||
      filePath.includes('.next') ||
      filePath.endsWith('json') ||
      filePath.endsWith('css')) {
    return issues;
  }

  // Check for common patterns
  patterns.forEach(pattern => {
    let match;
    // Reset regex index
    pattern.lastIndex = 0;
    while ((match = pattern.exec(content)) !== null) {
      const text = match[1];
      // Skip tech terms, URLs, etc.
      if (text.includes('http') ||
          text.includes('className') ||
          text.includes('import') ||
          text.includes('export') ||
          text.includes('function') ||
          text.includes('const') ||
          text.includes('return') ||
          text.includes('interface') ||
          text.includes('type')) {
        continue;
      }
      issues.push({
        line: content.substring(0, match.index).split('\n').length,
        text: text.substring(0, 50),
      });
    }
  });

  return issues;
}

function scanDirectory(dir, extensions = ['.tsx', '.ts']) {
  const results = [];

  if (!fs.existsSync(dir)) {
    return results;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results.push(...scanDirectory(filePath, extensions));
    } else if (extensions.some(ext => file.endsWith(ext))) {
      const issues = checkFile(filePath);
      if (issues.length > 0) {
        results.push({ file: filePath, issues });
      }
    }
  });

  return results;
}

console.log('\n🔍 Hardcoded String Detection Report');
console.log('=====================================\n');

const appResults = scanDirectory(appDir);
const componentsResults = scanDirectory(componentsDir);
const allResults = [...appResults, ...componentsResults];

if (allResults.length === 0) {
  console.log('✅ No hardcoded strings found!\n');
} else {
  console.log(`⚠️  Found potential hardcoded strings in ${allResults.length} files:\n`);

  allResults.forEach(result => {
    const relativePath = path.relative(path.join(__dirname, '..'), result.file);
    console.log(`📄 ${relativePath}`);
    result.issues.slice(0, 5).forEach(issue => {
      console.log(`   Line ${issue.line}: "${issue.text}"`);
    });
    if (result.issues.length > 5) {
      console.log(`   ... and ${result.issues.length - 5} more`);
    }
    console.log('');
  });
}

console.log('✨ Run "npm run check-hardcoded" to verify no hardcoded strings\n');
