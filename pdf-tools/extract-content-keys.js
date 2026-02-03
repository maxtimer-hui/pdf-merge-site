#!/usr/bin/env node

/**
 * Extract content translation keys from messages/en.json
 * Generates a markdown reference document for translators
 */

const fs = require('fs');
const path = require('path');

// Content sections to extract
const CONTENT_SECTIONS = [
  'about',
  'contact',
  'privacy',
  'terms',
  'cookies',
  'blog',
  'tutorials',
  'resources',
  'compare',
  'team'
];

/**
 * Truncate text to specified length
 */
function truncate(text, maxLength = 60) {
  if (!text || typeof text !== 'string') return '';
  const truncated = text.trim();
  return truncated.length > maxLength
    ? truncated.substring(0, maxLength) + '...'
    : truncated;
}

/**
 * Recursively extract keys from nested object
 */
function extractKeys(obj, prefix = '', result = {}) {
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively handle nested objects
      extractKeys(value, fullKey, result);
    } else {
      // Store the key with its value
      result[fullKey] = value;
    }
  }
  return result;
}

/**
 * Format a section as markdown
 */
function formatSection(sectionName, data) {
  const lines = [];

  // Section header
  lines.push(`## ${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`);
  lines.push('');

  // Extract all keys in this section
  const keys = extractKeys(data);

  // Sort keys alphabetically
  const sortedKeys = Object.keys(keys).sort();

  // Create table header
  lines.push('| Key | English Value |');
  lines.push('|-----|---------------|');

  // Add each key-value pair
  for (const key of sortedKeys) {
    const value = truncate(keys[key], 80);
    // Escape pipe characters in markdown
    const escapedValue = value.replace(/\|/g, '\\|');
    lines.push(`| \`${key}\` | ${escapedValue} |`);
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Main function
 */
function main() {
  const enJsonPath = path.join(__dirname, 'messages', 'en.json');
  const outputPath = path.join(__dirname, 'messages', 'content-keys-reference.md');

  // Read English translations
  console.log('Reading messages/en.json...');
  const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf-8'));

  // Build markdown content
  const lines = [];

  // Document header
  lines.push('# Content Translation Keys Reference');
  lines.push('');
  lines.push('This document lists all content translation keys from `messages/en.json`.');
  lines.push('Use this as a reference when translating to other languages.');
  lines.push('');
  lines.push('**Last Updated:** ' + new Date().toISOString().split('T')[0]);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Process each content section
  for (const section of CONTENT_SECTIONS) {
    if (enJson[section]) {
      console.log(`Extracting ${section} keys...`);
      lines.push(formatSection(section, enJson[section]));
      lines.push('---');
      lines.push('');
    }
  }

  // Statistics
  lines.push('## Summary');
  lines.push('');
  let totalKeys = 0;
  for (const section of CONTENT_SECTIONS) {
    if (enJson[section]) {
      const keys = extractKeys(enJson[section]);
      const count = Object.keys(keys).length;
      totalKeys += count;
      lines.push(`- **${section}**: ${count} keys`);
    }
  }
  lines.push('');
  lines.push(`**Total: ${totalKeys} content translation keys**`);
  lines.push('');

  // Write output file
  const markdown = lines.join('\n');
  fs.writeFileSync(outputPath, markdown, 'utf-8');

  console.log(`\n✅ Generated content keys reference: ${outputPath}`);
  console.log(`📊 Total content keys extracted: ${totalKeys}`);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { extractKeys, formatSection };
