# Japanese Vehicle Imports — Static Website

Static marketing site for **japanesevehicleimports.com.au**. Built for Cloudflare Pages with automatic deploys on push. Plain HTML/CSS/JS (no framework).

## Repo and deploy

- **Git remote (as per plan):** https://github.com/daviddebono/JapaneseVehicleImports.git  
- **Live site:** Served from this repo via Cloudflare Pages.  
- **Deploy:** Push to `main`; Cloudflare Pages builds and deploys automatically.

**Note:** If you are building in a different repo (e.g. ElectronicsRecyclerSite), copy the site files into your JapaneseVehicleImports repo or point Cloudflare Pages at this repo. The domain in all HTML/meta/sitemap is **japanesevehicleimports.com.au** — update in code if your live domain differs.

## Cloudflare Pages setup (first time)

1. Go to **[dash.cloudflare.com](https://dash.cloudflare.com)** → **Workers & Pages** → **Pages** → **Create application** → **Connect to Git**.
2. Connect GitHub and select the repo (e.g. **daviddebono/JapaneseVehicleImports**).
3. **Build configuration:**
   - **Build command:** `bash build.sh` (or the one-liner in the table below if the field accepts it)
   - **Root directory:** `.`
   - **Build output directory:** `dist`
4. **Save and Deploy.**

If `build.sh` is not used, use this **Build command** (one line):  
`mkdir -p dist && cp -r css js assets blog locations services dist/ && cp *.html favicon.svg robots.txt sitemap.xml dist/`

## Editing locally

1. Clone the repo and open the folder in your editor.
2. Edit HTML/CSS/JS as needed. No build step — edit and refresh the browser.
3. To preview: `npx serve .` or `python -m http.server 8000`, then open the URL shown.
4. Commit and push to `main` to deploy.

## Form setup (Formspree)

The site has **two forms** that post to Formspree. Your email is never shown on the site; Formspree forwards submissions to you (e.g. Daviddebono81@gmail.com).

### 1. Create two forms on Formspree

1. Go to [formspree.io](https://formspree.io) and sign up or log in.
2. Create **Form 1** for the **enquiry form** (name, company, role, email, phone, budget, message). Formspree will give you an endpoint like `https://formspree.io/f/xxxxxxxx`.
3. Create **Form 2** for the **newsletter** (email only). Get its endpoint.

### 2. Paste endpoints into the code

Open **`contact.html`** and replace the placeholders:

- **Enquiry form:** Find `YOUR_FORMSPREE_ENDPOINT_ENQUIRY` in the enquiry form’s `action` attribute. Replace it with your **enquiry form** ID (the part after `/f/`).  
  Example: if your URL is `https://formspree.io/f/abc123xy`, the action should be `https://formspree.io/f/abc123xy`.
- **Newsletter form:** Find `YOUR_FORMSPREE_ENDPOINT_NEWSLETTER` in the newsletter form’s `action` attribute. Replace it with your **newsletter form** ID.

### 3. Success redirect (optional)

Both forms use a hidden `_next` field that redirects to `https://www.japanesevehicleimports.com.au/contact.html?enquiry=success` or `?newsletter=success`. If your live site uses a different domain, search in `contact.html` for `_next` and update the URLs.

### 4. Formspree free tier

Formspree’s free tier typically allows around 50 submissions per month per form. Enable honeypot (already in the forms) and consider reCAPTCHA in the Formspree dashboard if needed.

## Adding a new blog post

1. Copy **`blog/template.html`** and rename it to your slug, e.g. `blog/my-new-post.html`.
2. Replace the placeholders: `BLOG_TITLE`, `BLOG_DESCRIPTION`, `BLOG_SLUG`, `BLOG_SUBTITLE`, `SUMMARY_BOX`, and add your content (H2/H3, paragraphs, internal links to services/locations). Use Australian spelling.
3. Add a link to the new post on **`blog/index.html`** (in the card grid).
4. **Update the sitemap:** Open **`sitemap.xml`** and add a new `<url>` entry, for example:
   ```xml
   <url><loc>https://www.japanesevehicleimports.com.au/blog/my-new-post.html</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
   ```
5. Commit and push to deploy.

## Site structure

- **`/`** — Home (full-width hero, what we do, who it’s for, benefits, how it works, engagement models, testimonials, FAQ, CTA).
- **`/about.html`** — About Us.
- **`/services.html`** — Services overview with links to 3 service pages.
- **`/benefits.html`** — Benefits and ROI.
- **`/case-studies.html`** — Illustrative case studies.
- **`/contact.html`** — Enquiry form + newsletter signup.
- **`/capability-statement.html`** — Capability statement (print / Save as PDF).
- **`/privacy.html`** — Privacy policy.
- **`/terms.html`** — Terms of use.
- **`/locations/`** — Sydney, Melbourne, Brisbane, Adelaide, Canberra, Hobart.
- **`/services/`** — Japanese Car Imports, Japanese Van Imports, Japanese Truck Imports.
- **`/blog/`** — Blog index and 12 SEO articles (vehicle import focus).
- **`/css/style.css`** — Single main stylesheet.
- **`/js/main.js`** — Mobile nav and minimal JS.
- **`/assets/`** — Logo and images.
- **`sitemap.xml`** — Static sitemap (update when adding pages).
- **`robots.txt`** — Allows all, points to sitemap.
- **`docs/PLAN-ASSESSMENT-JVI.md`** — Critical assessment of the original plan and upgraded plan for japanesevehicleimports.com.au.

## Logo and favicon

- **Logo:** `assets/logo.svg`. Replace with your own if desired; keep the same path or update references in the HTML.
- **Favicon:** `favicon.svg` at repo root. Browsers use `/favicon.svg`.

## Hero images

- **Homepage:** `index.html` uses `/assets/hero-home.jpg` with an Unsplash fallback. Add **hero-home.jpg** to **`/assets/`** for a custom hero.
- **Subpages:** Inner pages use a hero from `/assets/hero-subpages.jpg` or the CSS fallback. Add your image to **`/assets/`** for a custom subpage hero. Recommended size: 1920×600 px or similar; keep file size under ~300–500 KB.
