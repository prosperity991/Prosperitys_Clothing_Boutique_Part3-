# Prosperity's Clothing Boutique — Part 3

## Project overview
Prosperity's Clothing Boutique is a responsive front-end website for a women's fashion boutique in Krugersdorp, Gauteng, South Africa. The website showcases dresses, occasion wear, shoes, sandals, handbags and accessories. It continues the Part 2 project and adds the JavaScript, form, SEO and publishing preparation required for Part 3.

## Pages
- `index.html` — home page, featured products, style tabs and image gallery
- `about.html` — boutique information and interactive FAQ accordion
- `shop.html` — product catalogue with search, category filtering and sorting
- `new-arrivals.html` — dynamically rendered new products
- `enquiry.html` — product, price, availability and other enquiry form
- `contact.html` — general contact form and interactive Krugersdorp map
- `cart.html` — cart contents, quantity controls and enquiry hand-off

## Part 3 requirements implemented

### JavaScript and interaction
- Interactive tabs on the home page.
- FAQ accordion on the About page.
- Image gallery with a larger lightbox preview and close control.
- Leaflet/OpenStreetMap map showing the Krugersdorp town area on the Contact page. This is an area reference, not a confirmed shop-front address.
- Dynamic product cards generated from a JavaScript product data array.
- Product search, category filtering and sorting by price/name.
- Shopping cart with add, remove, quantity controls and `localStorage` persistence.
- Responsive mobile navigation.
- Scroll reveal animations using `IntersectionObserver`, with a reduced-motion preference.
- DOM updates and accessible live status messages.

### Forms and validation
- `enquiry.html` contains a product enquiry form. It requests name, email, enquiry type, product, size (optional), date (optional) and a message. It provides a client-side response path and prepares a message for the boutique.
- `contact.html` contains a separate general contact form with contact details, message type and full message.
- JavaScript checks required fields, email format and minimum text lengths and displays errors before submission.
- Both forms attempt AJAX submission using FormSubmit's AJAX endpoint. The recipient is `hello@prosperitysboutique.co.za`, matching the address already used in the Part 2 website.
- If the AJAX service is unavailable or has not been activated for that mailbox, the website opens a pre-filled email using `mailto:`. The visitor must press Send in their email application.
- When AJAX submission is active, form data is sent to the FormSubmit service for delivery to the configured recipient. Do not collect real customer information until the recipient and privacy arrangements have been checked.
- **Before live use:** verify that the recipient email address belongs to the boutique and activate it with FormSubmit. This is a front-end student project; no private server or database is included.

### Search engine optimisation
- Each HTML page has its own title and meta description.
- Relevant keyword phrases are included in the metadata and page copy.
- Heading hierarchy and descriptive image alternative text are used.
- Product images use lazy loading where appropriate.
- Internal links connect related pages.
- Clean, descriptive file names are used for pages and assets.
- `robots.txt` and `sitemap.xml` are included.
- The contact page supports local search context by identifying Krugersdorp, Gauteng.
- The sitemap currently uses the proposed domain `https://www.prosperitysboutique.co.za`. Replace every occurrence with the actual published website URL before submitting/deploying. Do not submit the proposed URL as a live address unless it has been registered and points to the deployed site.

### Performance and security
- The project uses a small number of local SVG illustrations instead of large raster image files.
- Product images are lazy-loaded.
- CSS and JavaScript are stored in external files.
- Responsive CSS supports desktop, tablet and mobile widths.
- `_headers` provides example security headers for Netlify hosting. Review the policy if adding third-party scripts or other integrations.
- Use HTTPS when publishing. Do not store passwords, payment details or sensitive customer information in this static front-end project.

## Part 2 feedback and correction record
The Part 2 README recorded these issues and corrections:
1. **Semantic structure:** pages use HTML5 semantic elements such as `header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `address` and `footer`.
2. **Content tags:** pages include meaningful headings, paragraphs, links and images with alternative text.
3. **Sufficient content:** boutique content, product descriptions, categories and page-specific information are present.
4. **Navigation:** consistent links connect all pages; the mobile menu is interactive.
5. **Code comments:** comments explain the main HTML, CSS and JavaScript sections.
6. **GitHub commits:** use the descriptive commit examples below.
7. **README:** this document records the project, features, testing, changelog and references.
8. **References:** references are listed below.

## Testing checklist
Test locally by opening `index.html` or using a local development server.

### Navigation and layout
- [ ] Open each page from the navigation menu.
- [ ] Test the mobile menu at a narrow screen width.
- [ ] Test browser Back and Forward buttons.
- [ ] Check there is no horizontal scrolling on mobile.
- [ ] Check all images load and have useful alt text.

### JavaScript functionality
- [ ] Switch all three home-page tabs.
- [ ] Open and close each FAQ accordion item.
- [ ] Open a gallery image, then close it with the close button, backdrop or Escape key.
- [ ] Search products by name and description.
- [ ] Filter by every category.
- [ ] Sort products by price and name.
- [ ] Add multiple products to the cart.
- [ ] Increase/decrease quantities and remove an item.
- [ ] Refresh the page and confirm cart contents persist.
- [ ] Check that the cart count updates on every page.
- [ ] Check the map loads when internet access is available.

### Forms
- [ ] Submit each form empty and check that validation messages appear.
- [ ] Enter an invalid email and check the error.
- [ ] Enter a valid contact message.
- [ ] Enter a product enquiry and check the email preparation/submission behaviour.
- [ ] Confirm the configured recipient mailbox is correct and activated before relying on AJAX submission.

### SEO and publishing
- [ ] Inspect each page title and meta description.
- [ ] Open `/robots.txt` and `/sitemap.xml` after deployment.
- [ ] Replace the proposed sitemap domain with the actual deployment URL.
- [ ] Test the deployed website on desktop and mobile.
- [ ] Check the deployed site uses HTTPS.

## Suggested GitHub commits
Run these commands from the project folder. If you already have a Git repository, do not repeat `git init`.

```bash
git add index.html about.html
git commit -m "Add interactive tabs FAQ accordion and image gallery"

git add shop.html new-arrivals.html cart.html script.js
git commit -m "Enhance dynamic product search sorting and cart interactions"

git add contact.html enquiry.html
git commit -m "Add validated contact and product enquiry forms"

git add style.css
git commit -m "Add responsive styles animations and accessible interactive components"

git add robots.txt sitemap.xml _headers
git commit -m "Add technical SEO files and security headers"

git add README.md
git commit -m "Document Part 3 implementation testing and changelog"
```

If the GitHub remote is already configured:
```bash
git status
git push
```

If no remote is configured yet:
```bash
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Free deployment: Netlify
1. Push the project to GitHub.
2. Sign in to Netlify and choose **Add new site** / **Import an existing project**.
3. Connect the GitHub repository.
4. Use the project root as the publish directory. No build command is required for this static HTML/CSS/JavaScript website.
5. Deploy the site.
6. Copy the actual public URL and replace the proposed domain in `robots.txt` and `sitemap.xml`.
7. Commit and push the updated SEO files, then allow Netlify to redeploy.
8. Test all pages and forms on the deployed URL.

GitHub Pages is another possible static hosting option.

## Changelog

### Part 3 — 2 November 2026
- Reviewed the Part 3 brief and continued the supplied Part 2 website.
- Added interactive tabs to the home page.
- Added a collapsible FAQ accordion to the About page.
- Added a clickable image gallery with a lightbox preview.
- Added a Leaflet/OpenStreetMap interactive map for the Krugersdorp area.
- Added a dedicated `enquiry.html` page with product, availability and pricing enquiry fields.
- Enhanced the general contact form with message-type selection and client-side validation.
- Added JavaScript form validation, error messages and AJAX email submission with a `mailto:` fallback.
- Added dynamic product search, category filtering and sorting.
- Preserved and improved the local-storage shopping cart.
- Added scroll reveal animations and reduced-motion support.
- Added page-specific keyword metadata, descriptions and titles.
- Added `robots.txt`, `sitemap.xml` and Netlify security headers.
- Updated navigation and links to include the enquiry page.
- Updated this README with Part 3 changes, testing steps, GitHub commits and deployment instructions.

### Part 2 — 15 September 2026
- Rebuilt page structure using HTML5 semantic elements.
- Added complete navigation between all pages.
- Added meaningful headings, paragraphs, links and image `alt` text.
- Added complete boutique content instead of placeholders.
- Created an external `style.css` stylesheet.
- Added consistent typography, colour palette, spacing and visual hierarchy.
- Added responsive desktop, tablet and mobile layouts.
- Added mobile navigation.
- Added product search and category filtering.
- Added shopping-cart functionality using JavaScript and local storage.
- Added contact form interaction.
- Added comments to HTML, CSS and JavaScript.
- Added README documentation and references.

## References
- MDN Web Docs. HTML forms and constraint validation. https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
- MDN Web Docs. JavaScript and DOM events. https://developer.mozilla.org/en-US/docs/Web/JavaScript
- MDN Web Docs. Intersection Observer API. https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- MDN Web Docs. Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- Google Search Central. SEO Starter Guide. https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central. Build and submit a sitemap. https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Leaflet. Quick Start Guide. https://leafletjs.com/examples/quick-start/
- OpenStreetMap. Copyright and attribution. https://www.openstreetmap.org/copyright
- FormSubmit. AJAX form submission documentation. https://formsubmit.co/documentation
- Netlify Docs. Deploy with Git. https://docs.netlify.com/welcome/add-new-site/

## Academic and operational limitations
- This is a static academic prototype. It does not process payments or store orders in a secure server database.
- The listed products and prices are sample project data and should be confirmed before commercial use.
- The map marks the Krugersdorp town area only. A precise shop address was not supplied.
- Email delivery depends on confirming the recipient mailbox and activating the FormSubmit integration. The `mailto:` fallback requires the visitor to have an email application configured.
- The proposed sitemap domain must be replaced with the real deployed URL.
