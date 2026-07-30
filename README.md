# MyBrandFather — Bright Luxury Multipage Website

This is the repaired production package for the bright luxury MyBrandFather design.

## What was fixed

- Local CSS, JavaScript, image, video, page and navigation paths were converted to relative paths.
- The site can now be previewed by double-clicking `index.html`.
- The same files also work when deployed at the root of `https://mybrandfather.com/`.
- Missing social, publishing and MBF Labs images were replaced with truthful branded preview assets.
- The Open Graph image is now local and production-safe.
- `sitemap.xml`, `robots.txt`, `.gitignore`, legal placeholders and email references were cleaned.
- Unverified Instagram and LinkedIn claims were removed from structured data.
- The contact form still requires a real Web3Forms access key.

## Preview

### Fast preview

Double-click `index.html`.

### Recommended full preview

From this folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Deployment

Upload the **contents of this folder** to the repository root. Do not upload the ZIP itself and do not keep an extra wrapper folder.

The expected production root contains:

- `index.html`
- page folders such as `about/`, `services/`, `work/`, `labs/`, `journal/`, and `contact/`
- `assets/`
- `404.html`
- `robots.txt`
- `sitemap.xml`

## Manual step still required

Create a Web3Forms access key for `hello@mybrandfather.com` and replace:

```text
WEB3FORMS_ACCESS_KEY_HERE
```

inside:

```text
contact/index.html
```

No secret or private key is included in this package.
