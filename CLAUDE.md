# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PDF Tools is a multilingual Next.js 16 application that provides free, secure, client-side PDF processing tools. All PDF operations happen locally in the browser using pdf-lib - no files are ever uploaded to servers.

**Monorepo Structure**: The main application lives in the `pdf-tools/` directory. Always work from that directory.

**Live Site**: https://combinepdffree.net

## Development Commands

All commands must be run from the `pdf-tools/` directory:

```bash
cd pdf-tools

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### Routing Structure (Next.js App Router)

- **Dynamic Locale Routing**: All routes are prefixed with `[locale]` segment for internationalization
  - Example: `/[locale]/merge` → `/en/merge`, `/zh/merge`, etc.
  - Configuration: `i18n/request.ts` defines available locales

- **Route Categories**:
  - **Tools**: `merge`, `split`, `extract`, `compress`, `rotate`, `delete-pages`, `reorder`, `watermark`, `batch`, `encrypt`, `decrypt`
  - **Content**: `blog`, `tutorials`, `resources`, `compare`
  - **Legal**: `about`, `contact`, `privacy`, `terms`, `cookies`

### Internationalization (i18n)

- **Framework**: next-intl
- **Locale Configuration**: `i18n/request.ts` exports `locales` array
- **Translation Files**: `messages/[locale].json` (e.g., `en.json`, `zh.json`)
- **Supported Locales**: zh, zh-tw, en, es, fr, de, ar, pt, ja, ko

**Translation Keys Structure**:
- `seo.*` - SEO metadata for each page (title, description, keywords)
- `common.*` - Shared UI strings (button labels, navigation, etc.)
- Tool-specific namespaces for each feature

### PDF Processing Core

**Location**: `lib/pdf-utils.ts`

All PDF operations use pdf-lib and return `Uint8Array`:
- `mergePDFs(files)` - Combine multiple PDFs
- `splitPDFByRange(file, ranges)` - Split by page ranges (e.g., "1-3,5,7-9")
- `splitPDFEvery(file, n)` - Split every N pages
- `extractPages(file, pages)` - Extract specific pages
- `compressPDF(file, options)` - Compress with options
- `rotatePDF(file, rotations)` - Rotate pages
- `deletePages(file, pages)` - Remove pages
- `reorderPages(file, newOrder)` - Reorder pages
- `addWatermark(file, options)` - Add text watermark (supports Chinese via Google Fonts)

**Important**: Encryption/decryption functions exist in `lib/pdf-crypto.ts` but are NOT fully implemented - pdf-lib doesn't support these features yet.

### Page Structure Pattern

Each tool page follows this pattern:

```
app/[locale]/[tool]/
├── page.tsx              # Server component - SEO metadata, structured data
└── [Tool]Client.tsx      # Client component - actual tool logic
```

**Server Component** (`page.tsx`):
- Generates metadata using `generateMetadata()` with translations
- Creates structured data (JSON-LD) for SEO
- Renders client component

**Client Component** (`[Tool]Client.tsx`):
- Contains all interactive logic
- Imports utilities from `@/lib/pdf-utils`
- Uses translations via `useTranslations()` hook

### SEO & Structured Data

**Schema.org Integration**: Each page generates relevant JSON-LD structured data
- FAQ schema: `lib/schema-faq.ts`
- HowTo schema: `lib/schema-howto.ts`
- Organization schema: `lib/team.ts`
- Breadcrumb schema: `lib/breadcrumb-schema.ts`

**Sitemap**: `app/sitemap.ts`
- Dynamic generation for all locales × tools × content pages
- Priority system based on tool importance and language market
- Example: English merge page has highest priority (0.95)

**Canonical URLs**: `lib/canonical.ts` handles URL generation for all locales

### Shared Components

**Location**: `components/`

- `Navbar.tsx` - Navigation with language switcher
- `Footer.tsx` - Footer with links and copyright
- `Breadcrumb.tsx` - SEO breadcrumb navigation
- `RelatedTools.tsx` - Shows related tool suggestions

### Content Libraries

**Location**: `lib/`

- `blog-posts.ts` - Blog post data for all locales
- `tutorials.ts` - Tutorial content
- `external-resources.ts` - External resource links
- `comparisons.ts` - Tool comparison data
- `related-tools.ts` - Tool relationship mapping

These data structures follow pattern: `[locale]: { ...content }`

### State Management

- **Framework**: Zustand (minimal usage)
- Most state is local component state (useState)
- File uploads handled via standard HTML5 File API

### Styling

- **Framework**: Tailwind CSS 3
- Configuration: `tailwind.config.js`
- Global styles: `app/globals.css`
- Responsive design: mobile-first approach

## Key Development Patterns

### Adding a New Tool

1. Create `app/[locale]/[tool-name]/page.tsx` (server component)
2. Create `app/[locale]/[tool-name]/[Tool]Client.tsx` (client component)
3. Add SEO keys to `messages/[locale].json` under `seo.[tool-name]`
4. Add translations to each locale's message file
5. Add route to `app/sitemap.ts` tools array
6. Add to `lib/related-tools.ts` if applicable

### Adding a New Language

1. Add locale to `i18n/request.ts` locales array
2. Create `messages/[new-locale].json` (copy `en.json` as template)
3. Translate all keys (SEO, common, tool-specific)
4. Add locale priority to `app/sitemap.ts`
5. Test all routes with new locale

### Client-Side File Processing

```typescript
// Standard pattern for file operations
const handleFiles = async (files: FileList) => {
  const fileArray = Array.from(files);
  const result = await somePDFFunction(fileArray);
  downloadPDF(result, 'output.pdf');
};
```

### Translation Usage

```typescript
// Server component
const t = await getTranslations({locale, namespace: 'common'});
const title = t('merge');

// Client component
const t = useTranslations('merge');
const title = t('title');
```

## Important Constraints

### PDF Processing Limitations
- **Encryption/Decryption**: Not implemented - pdf-lib doesn't support password protection
- **Compression**: Limited to removing unused objects - can't resize images
- **Chinese Font**: Watermarks with Chinese text fetch from Google Fonts (Noto Sans SC)

### Privacy & Security
- All processing MUST be client-side
- Never implement file upload APIs
- Files should be processed and discarded immediately
- No telemetry or analytics that exposes file content

### SEO Requirements
- Every page must have proper metadata (title, description, keywords)
- Include structured data (JSON-LD) for tools
- Maintain canonical URLs and alternate language links
- Update sitemap when adding new routes

## File Path Resolution

**Path Alias**: `@/*` resolves to `pdf-tools/` directory (configured in `tsconfig.json`)

Examples:
- `@/lib/pdf-utils` → `pdf-tools/lib/pdf-utils.ts`
- `@/components/Navbar` → `pdf-tools/components/Navbar.tsx`
- `@/i18n/request` → `pdf-tools/i18n/request.ts`

## Build Configuration

- **Next.js Config**: `next.config.js` wraps with `next-intl/plugin`
- **i18n Config**: Points to `i18n/request.ts` for locale detection
- **TypeScript**: Strict mode enabled, path aliases configured
- **Module Resolution**: `bundler` mode for Next.js 16
