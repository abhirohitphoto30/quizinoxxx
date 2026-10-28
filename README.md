# ✦ ABHISHEK TOOLS HUB

### Some beautiful tools by **ABHISHEK PRAJAPAT**

A premium, responsive launchpad for your standalone HTML tools. Drop HTML files into `pages/`, deploy the repository, and the website automatically builds a searchable tool library. Every entry displays the **exact filename** you uploaded and can be opened inside the hub or in a separate tab.

No framework, database, API key, or third-party dependency required. ✨

---

## ✨ Features

- **Drop in any number of tools** — add `.html` or `.htm` files directly to `pages/`.
- **Exact filenames preserved** — spaces, capitals, punctuation, numbers and Unicode filenames are supported; the library shows the original filename.
- **Automatic discovery** — `build.js` scans the folder and generates the tool catalogue on each deployment.
- **Instant switching** — select a file from the searchable library to load it in the built-in viewer.
- **Search by filename** — filter the library as you type.
- **Open in new tab**, reload the selected tool, and fullscreen the viewer.
- **Responsive UI** — designed for desktop, tablet and mobile.
- **Vercel + Render ready** — static deployment; no server runtime needed after build.
- **Lightweight build** — plain Node.js; no `npm install` is required.

## 📂 Add your HTML tools

1. Open this repository on GitHub.
2. Open the `pages/` folder.
3. Click **Add file → Upload files**.
4. Upload one or more `.html` / `.htm` files.
5. Click **Commit changes**.

That is all. The hosting service detects the GitHub commit, rebuilds the site, and adds the files to the library automatically.

Example:

```text
pages/
├── PDF Toolkit.html
├── UPSC Quiz Maker v3.html
├── My New Tool.html
├── hindi-tool.html
└── another-tool.htm
```

The tool list displays names such as `UPSC Quiz Maker v3.html` exactly as uploaded. You do **not** need to edit `build.js`, the HTML template, or a manifest each time.

**Important:** keep HTML files directly inside `pages/`. Files inside nested subfolders are not scanned. Files beginning with a dot (hidden files) are ignored. All other `.html` and `.htm` filenames are eligible.

### What about very large HTML files?

The build script copies files as-is and does not parse or rewrite their contents. The practical maximum is determined by your Git provider and hosting platform, not this gallery script. GitHub's browser uploader has a per-file size limit; for large files use Git/LFS where appropriate and check the host's current limits. If an HTML file references separate CSS, JavaScript, images, fonts, or other assets, upload those assets too and keep the relative paths intact. For best portability, a self-contained HTML file is easiest.

## 🚀 Deploy on Vercel

### First deployment

1. Create a new repository on GitHub and upload the **contents** of this project (upload the files inside this folder, not an extra ZIP wrapper).
2. Visit [Vercel](https://vercel.com/) and sign in with GitHub.
3. Choose **Add New → Project** and import your repository.
4. Configure the project:
   - **Framework Preset:** Other
   - **Build Command:** `node build.js` (or `npm run build`)
   - **Output Directory:** `dist`
   - **Install Command:** leave blank, or use `npm install` (there are no dependencies)
5. Click **Deploy**.

The included `vercel.json` already defines the build command and output directory, so Vercel should detect these settings automatically.

### Every update after that

Upload HTML files to `pages/` and commit the changes to GitHub. Vercel automatically rebuilds and publishes the updated site.

## 🌐 Deploy on Render

### First deployment

1. Push this project to GitHub.
2. Open [Render](https://render.com/) and choose **New → Static Site**.
3. Connect the repository.
4. Set:
   - **Build Command:** `node build.js`
   - **Publish Directory:** `dist`
   - **Branch:** `main` (or whichever branch you use)
5. Create the Static Site.

The included `render.yaml` is also configured as a Render Blueprint. If you use **New → Blueprint**, select the repository and follow the prompts.

### Every update after that

Commit and push your changes to the connected branch. Render automatically rebuilds the static site.

> You can use Vercel, Render, or both for the same GitHub repository. They are independent deployments.

## 💻 Test locally

Install [Node.js 18 or newer](https://nodejs.org/) if it is not installed. No package installation is needed.

```bash
node build.js
```

Then serve the generated `dist/` folder. For example, with Python installed:

```bash
python -m http.server 8000 --directory dist
```

Open `http://localhost:8000` in your browser. Alternatively, use any static file server.

**Do not open `dist/index.html` by double-clicking it**; use a local server so the tool viewer and relative URLs behave consistently.

## ⚙️ Optional branding settings

Edit `site.config.json`:

```json
{
  "siteTitle": "ABHISHEK TOOLS",
  "eyebrow": "A DIGITAL PLAYGROUND",
  "tagline": "A curated space for useful, beautiful tools.",
  "defaultPage": "first",
  "accent": "#a99bff"
}
```

- `siteTitle`: brand text shown in the header and browser tab.
- `eyebrow`: small uppercase label above the title.
- `tagline`: reserved descriptive text for the site branding.
- `defaultPage`: `"first"` opens the first file in filename order; `"latest"` opens the last file in filename order.
- `accent`: CSS hex colour used for the accent.

## 🗂 Project structure

```text
abhishek-tools-hub/
├── pages/                  # Put your HTML tools here
│   └── README.txt
├── src/
│   └── index.template.html # Hub design and viewer
├── build.js                # Scans pages/ and creates dist/
├── site.config.json        # Optional branding settings
├── package.json
├── vercel.json
├── render.yaml
└── README.md
```

`dist/` is generated during build and is ignored by Git. Do not upload generated `dist/` files as your source of truth; the deployment build recreates them.

## 🔒 Privacy & practical notes

- The site is configured with `noindex, nofollow` so search engines are asked not to index it. This is **not password protection**; anyone with the public URL may still access it.
- Uploaded HTML files run in visitors' browsers. Only add HTML files you trust. A malicious HTML file can execute browser-side code.
- The viewer uses an iframe. Browser security rules, downloads, pop-ups, storage, or external API calls can behave differently inside an iframe than in a top-level tab. If a tool does not behave correctly inside the viewer, use **Open tab**.
- Keep any referenced assets at paths that match the HTML's relative links.
- This project is a static site. There is no login system or private file storage.

## 🛠 Troubleshooting

**The new HTML file is not showing**
- Confirm the file is directly inside `pages/`.
- Confirm the extension is `.html` or `.htm`.
- Make sure the GitHub commit completed and the latest deployment succeeded.
- Open the deployment's build log and look for `HTML page(s) discovered`.

**The file appears but its contents do not load**
- Click **Reload** or use **Open tab**.
- Check whether the HTML depends on local assets that were not uploaded.
- Check whether the HTML requires features blocked by iframe sandboxing or browser security policies.

**The page is blank when testing locally**
- Run the local server command above and open `http://localhost:8000`, not the file directly.

**The website still shows an old version**
- Check that the deployment is connected to the correct GitHub repository and branch, then inspect the latest deployment/build logs.

---

Made with ✦ by **ABHISHEK PRAJAPAT**.
