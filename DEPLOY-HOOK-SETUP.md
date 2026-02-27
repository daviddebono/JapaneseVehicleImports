# Auto-deploy on push (no manual Cloudflare trigger)

Git is updating but Cloudflare isn’t building automatically. This workflow triggers a Cloudflare Pages deploy **on every push to `main`** so you don’t have to manually trigger it.

---

## One-time setup

### 1. Create a Deploy Hook in Cloudflare

1. Go to **https://dash.cloudflare.com** → **Workers & Pages** → **japanesevehicleimports**.
2. Open **Settings** → **Builds & deployments**.
3. Find **Deploy hooks**.
4. Click **Add hook** (or the **+**).
5. **Name:** e.g. `GitHub Push`.
6. **Branch:** `main`.
7. Save. **Copy the hook URL** (it looks like `https://api.cloudflare.com/client/v4/pages/webhooks/...`). You’ll use it in the next step.

### 2. Add the hook URL as a GitHub secret

1. Go to **https://github.com/daviddebono/JapaneseVehicleImports**.
2. **Settings** → **Secrets and variables** → **Actions**.
3. **New repository secret**.
4. **Name:** `CLOUDFLARE_DEPLOY_HOOK_URL`
5. **Value:** paste the deploy hook URL from step 1.
6. Save.

### 3. Push the workflow

From your project folder:

```powershell
cd "C:\Users\debon\Documents\JapaneseVehicleImports"
git add .github/workflows/deploy-pages.yml DEPLOY-HOOK-SETUP.md
git commit -m "Add GitHub Action to trigger Cloudflare deploy on push to main"
git push origin main
```

---

## What happens after setup

- Every **push to `main`** runs the GitHub Action.
- The Action calls your Cloudflare Deploy Hook.
- Cloudflare starts a new build and deploy from the repo.
- You no longer need to manually trigger the deploy in Cloudflare.

You can confirm it in **GitHub** → **Actions** (each push should show a “Deploy to Cloudflare Pages” run) and in **Cloudflare** → **Deployments** (new deployment after each push).
