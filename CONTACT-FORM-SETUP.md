# Contact Form — Deploy & SMTP2Go Setup

The contact form in this repo has **Mandatory**, **Contact Name**, **Phone Number**, **Email**, and **Description**. It sends via **SMTP2Go** using a Cloudflare Pages Function. Follow these steps so the live site shows the new form and emails work.

---

## 1. Push the code to GitHub

From the project folder in Terminal/PowerShell:

```bash
git status
git add contact.html functions/api/send.js CONTACT-FORM-SETUP.md
git commit -m "Contact form: Mandatory, Contact Name, Phone Number, Email, Description; SMTP2Go"
git push origin main
```

(Use your actual default branch if it’s not `main`.)

---

## 2. Set SMTP2Go API key in Cloudflare

1. Go to **[dash.cloudflare.com](https://dash.cloudflare.com)** → **Workers & Pages** → open **JapaneseVehicleImports** (or your Pages project).
2. Go to **Settings** → **Environment variables**.
3. Click **Add variable** (or **Add secret** for production).
4. Set:
   - **Variable name:** `SMTP2GO_API_KEY`
   - **Value:** your SMTP2Go API key (from [smtp2go.com](https://www.smtp2go.com) → API Users).
5. Apply to **Production** (and **Preview** if you use it). Save.

---

## 3. Confirm Cloudflare Pages build settings

In the same project → **Settings** → **Builds & deployments**:

- **Build command:** `bash build.sh`
- **Build output directory:** `dist`

If you don’t use `build.sh`, use this one-line build command instead:

```bash
mkdir -p dist && cp -r css js assets blog locations services dist/ && cp *.html favicon.svg robots.txt sitemap.xml dist/
```

---

## 4. Redeploy so the new form and env are live

1. Go to **Deployments**.
2. Either wait for the new deploy after your `git push`, or click **Create deployment** and deploy the branch you pushed (e.g. `main`).
3. Open the deployment URL (or your custom domain) and open the contact page.
4. Do a **hard refresh**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac), or try an incognito window so you don’t see an old cached form.

---

## 5. Current form behaviour

- **Fields:** Mandatory (indicator), Contact Name, Phone Number, Email, Description (all required).
- **Submission:** Form posts to `/api/send` (Cloudflare Pages Function), which calls SMTP2Go.
- **Sender (in code):** `japanesevehicleimports@circlebc.com.au`
- **Recipients (in code):** `goran.tipura@circlebc.com.au`, `david.debono@circlebc.com.au`

To change sender or recipients, edit `functions/api/send.js` (constants at the top), then commit and push and redeploy.
