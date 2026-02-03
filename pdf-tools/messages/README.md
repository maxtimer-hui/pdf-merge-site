# Translation Files

This directory contains all internationalization (i18n) message files for the PDF Tools application.

## Overview

The application uses [next-intl](https://next-intl-docs.vercel.app/) for internationalization. All user-facing text must be translated across all supported locales.

## Supported Locales

| Locale | Language | File | Keys | Status |
|--------|----------|------|------|--------|
| `en` | English | `en.json` | 1,224 | ✓ Complete |
| `zh` | Simplified Chinese | `zh.json` | 1,229 | ✓ Complete |
| `zh-tw` | Traditional Chinese | `zh-tw.json` | 1,231 | ✓ Complete |
| `es` | Spanish | `es.json` | 1,228 | ✓ Complete |
| `fr` | French | `fr.json` | 1,228 | ✓ Complete |
| `de` | German | `de.json` | 1,228 | ✓ Complete |
| `pt` | Portuguese | `pt.json` | 1,228 | ✓ Complete |
| `ja` | Japanese | `ja.json` | 1,125 | ⚠ Minor issues |
| `ko` | Korean | `ko.json` | 1,228 | ✓ Complete |
| `ar` | Arabic | `ar.json` | 1,227 | ⚠ Minor issues |

**Note**: Japanese and Arabic have minor translation inconsistencies that don't affect functionality.

## Key Namespaces

Translation keys are organized by namespace and feature:

### SEO Metadata (`seo.*`)
- `seo.home` - Homepage SEO
- `seo.[tool]` - Tool-specific SEO (merge, split, extract, compress, rotate, deletePages, reorder, watermark, batch, encrypt, decrypt)
- `seo.[page]` - Content page SEO (about, contact, privacy, terms, cookies, blog, tutorials, resources, compare)

Each SEO object contains:
- `title` - Page title
- `description` - Meta description
- `keywords` - SEO keywords

### Common UI Strings (`common.*`)
Shared UI elements used across the application:
- Navigation items
- Button labels (upload, download, process, etc.)
- Status messages (success, error, loading)
- Footer links
- Language selector
- Form labels and placeholders

### Tool-Specific Namespaces
Each PDF tool has its own namespace with:
- `title` - Tool heading
- `description` - Tool description
- `useCases` - Use case descriptions (10 tools)
- `seoContent` - SEO-optimized content sections (10 tools)
- `instructions` - Step-by-step instructions
- `tips` - Usage tips and recommendations
- UI labels specific to the tool

**Tools**: `merge`, `split`, `extract`, `compress`, `rotate`, `deletePages`, `reorder`, `watermark`, `batch`, `encrypt`, `decrypt`

### Content Pages (`[page].*`)
Legal and informational content pages:
- `about` - About page (81 keys)
- `contact` - Contact page (62 keys)
- `privacy` - Privacy policy (48 keys)
- `terms` - Terms of service (68 keys)
- `cookies` - Cookie policy (101 keys)
- `blog` - Blog posts metadata (4 keys)
- `tutorials` - Tutorials metadata (10 keys)

**Total Content Keys**: 374 across all locales

## Adding New Translations

### 1. Adding a New Key

When adding new user-facing text:

1. **Add to all locale files** - Add the new key to every `messages/*.json` file
2. **Use translation keys in code** - Never hardcode text strings
3. **Verify completeness** - Run `npm run check-i18n`

```json
// Add to all locale files
{
  "common": {
    "newButton": "New Button Label"
  }
}
```

### 2. Using Translations

**Server Component**:
```typescript
import { getTranslations } from 'next-intl/server';

const t = await getTranslations({ locale, namespace: 'common' });
const buttonText = t('newButton');
```

**Client Component**:
```typescript
import { useTranslations } from 'next-intl';

const t = useTranslations('common');
const buttonText = t('newButton');
```

### 3. Translation Rules

- ✅ **DO** use logical CSS properties for RTL support (Arabic)
- ✅ **DO** keep keys descriptive and organized by namespace
- ❌ **DON'T** hardcode any user-facing text
- ❌ **DON'T** concatenate translated strings (use parameters instead)
- ❌ **DON'T** copy-paste translations without context

### 4. Translation Best Practices

```typescript
// ✅ Good - Use parameters
t('welcome', { name: userName })

// ❌ Bad - Concatenation
t('welcome') + ' ' + userName
```

## i18n Commands

The following npm scripts help maintain translation quality:

### Check Translation Completeness
```bash
npm run check-i18n
```
Verifies that all locales have the same keys. Reports missing or extra keys.

### Check Hardcoded Strings
```bash
npm run check-hardcoded
```
Scans the codebase for hardcoded strings that should be translated.

### Verify Tool Translations
```bash
node verify-translations.js
```
Checks that all 10 tools have `useCases` and `seoContent` translations.

### Check Content Translations
```bash
node check-usecases.js
```
Compares content translations across all locales.

## RTL Support

Arabic (`ar`) uses right-to-left (RTL) layout. The app automatically sets `dir="rtl"` on the `<html>` element for Arabic locale.

**CSS Best Practices for RTL**:
- Use logical properties: `margin-inline-start` instead of `margin-left`
- Use `gap` instead of specific margins/paddings
- Test UI with Arabic locale to ensure proper layout

## File Format

All translation files are standard JSON:
- Keys use camelCase
- Values are plain text (no HTML unless necessary)
- Newlines are represented as `\n`
- Special characters should be properly escaped

## Verification Scripts

Several scripts are available for verifying translations:

1. **`scripts/check-i18n-completeness.js`** - Official completeness checker
2. **`scripts/check-hardcoded-strings.js`** - Hardcoded string detector
3. **`verify-translations.js`** - Tool-specific verification
4. **`check-usecases.js`** - Content comparison across locales

## Related Documentation

- [Internationalization in CLAUDE.md](../CLAUDE.md#internationalization-i18n)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [i18n Configuration](../i18n/request.ts)

## Translation Status

- **Total Keys**: ~1,224 per locale
- **Content Pages**: 374 keys (100% coverage)
- **SEO Metadata**: 100% coverage
- **Tools**: 11 tools with full translations
- **Languages**: 10 languages supported
- **RTL Languages**: 1 (Arabic)

Last updated: 2026-02-03
