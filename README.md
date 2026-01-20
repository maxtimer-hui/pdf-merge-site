# PDF Tools - Free Online PDF Processing Tools

A collection of free, secure, and easy-to-use online PDF tools. All processing happens client-side in your browser - no files are uploaded to any server.

## Features

### PDF Merge
- Combine multiple PDF files into one document
- Drag & drop to reorder files
- Merge unlimited PDFs

### PDF Split
- Split PDF by page ranges (e.g., 1-5, 6-10)
- Split every N pages
- Split all pages into separate files
- Download individual files or all at once

### PDF Page Extract
- Extract specific pages from a PDF
- Range input (e.g., 1-5, 8, 10-15)
- Individual page selection
- Quick options: All pages, Even pages, Odd pages

## Common Features

- **100% Secure**: Files are processed locally in your browser
- **Completely Free**: No registration, no limits, no watermarks
- **Fast & Easy**: Process PDFs in seconds with just a few clicks
- **Mobile Friendly**: Works on all devices
- **SEO Optimized**: Built with search engine optimization in mind
- **Privacy Focused**: No data collection or storage

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern, responsive design
- **Vanilla JavaScript** - No frameworks required
- **pdf-lib** - Client-side PDF processing library

## Project Structure

```
pdf-merge-site/
├── index.html          # PDF Merge tool
├── split/
│   └── index.html      # PDF Split tool
├── extract/
│   └── index.html      # PDF Page Extract tool
├── css/
│   └── style.css       # Shared styles
├── js/
│   ├── app.js          # Merge logic
│   ├── split.js        # Split logic
│   └── extract.js      # Extract logic
├── assets/             # Images and favicon
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Search engine rules
└── README.md           # This file
```

## Local Development

1. Clone or download this repository
2. Open `index.html` (or any tool page) in your web browser
3. Start processing PDFs!

No build process or dependencies required - it just works!

## Deployment

### Option 1: Netlify (Recommended)

1. Go to [netlify.com](https://www.netlify.com/)
2. Create an account or log in
3. Drag and drop the entire `pdf-merge-site` folder into Netlify
4. Your site will be live instantly at `random-name.netlify.app`
5. (Optional) Add a custom domain in Site Settings

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to the project directory: `cd pdf-merge-site`
3. Run: `vercel`
4. Follow the prompts
5. Your site will be live at `your-project.vercel.app`

### Option 3: GitHub Pages

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to repository Settings > Pages
4. Select the branch (usually `main` or `master`)
5. Your site will be live at `https://username.github.io/repository-name`

## Customization

### Update Domain URLs

Before deploying, update these URLs in the following files:

1. **index.html, split/index.html, extract/index.html** - Update Open Graph and Twitter meta tags:
   ```html
   <meta property="og:url" content="https://combinepdffree.net/">
   <meta property="og:image" content="https://combinepdffree.net/assets/og-image.png">
   ```

2. **sitemap.xml** - Update all URLs:
   ```xml
   <loc>https://combinepdffree.net/</loc>
   ```

3. **robots.txt** - Update sitemap URL:
   ```txt
   Sitemap: https://combinepdffree.net/sitemap.xml
   ```

### Add Google AdSense

1. Apply for [Google AdSense](https://www.google.com/adsense/)
2. Replace the placeholder ad code in all HTML files:
   ```html
   <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-YYYYYYYYYYYYYY"
        data-ad-slot="ZZZZZZZZZZ"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
   ```
3. Add the AdSense script to the `<head>` section

### Add Google Analytics (Optional)

Add the Google Analytics tracking code to the `<head>` section of all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## SEO Optimization

This website is already optimized for search engines:

- **Meta tags**: Title, description, and keywords for each tool
- **Open Graph**: Social media sharing
- **Schema.org**: Structured data for SoftwareApplication
- **Semantic HTML**: Proper heading hierarchy
- **Mobile Friendly**: Responsive design
- **Fast Loading**: Minimal dependencies, CDN for libraries
- **Sitemap**: Includes all tool pages

### Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add your website property
3. Verify ownership (HTML tag, DNS, or Google Analytics)
4. Submit your sitemap: `https://combinepdffree.net/sitemap.xml`
5. Request indexing for all pages

## Google AdSense Approval Tips

To improve your chances of AdSense approval:

1. **Content**: The site already has sufficient content (FAQ, How It Works, About sections)
2. **Navigation**: Clear navigation menu with tool links
3. **Privacy Policy**: Included in the Privacy section
4. **Age**: Site should be at least a few weeks old with consistent traffic
5. **Traffic**: Build organic traffic through SEO and content marketing
6. **Design**: Professional, clean design (already implemented)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## License

This project is open source and available for free. Feel free to modify and use it for your own projects.

## Support

If you encounter any issues or have questions, please check the FAQ section on the website or create an issue in the repository.

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## Acknowledgments

- [pdf-lib](https://github.com/Hopding/pdf-lib) - JavaScript PDF creation and modification library
- [Netlify](https://www.netlify.com/) - Deployment platform (optional)
- [Vercel](https://vercel.com/) - Deployment platform (optional)

---

Made with ❤️ for the global community
