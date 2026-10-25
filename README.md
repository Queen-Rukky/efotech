# EfoTech website

A fast, responsive one-page website for EfoTech, built with plain HTML, CSS and JavaScript. There is no build step.

## Structure

```
index.html        Page content (all sections)
css/styles.css    Styles, including dark mode and mobile layout
js/main.js        Mobile menu, scroll animations, contact form
assets/           Logo / favicon
```

## Preview locally

Open `index.html` in a browser, or run a local server:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customize

All placeholder content is in `index.html`. Update:

- **Contact details**: email `hello@efotech.com`, phone and location in the Contact section (also the email in `js/main.js`)
- **Stats**: the `data-count` numbers in the hero
- **Services, About, Testimonials, FAQ**: edit the text directly
- **Colors**: change `--primary` and `--accent` at the top of `css/styles.css`

## Deploy

- **Netlify** (recommended): connect this repo, leave the build command empty and set the publish directory to `/`. The contact form works automatically with Netlify Forms.
- **GitHub Pages**: Settings → Pages → deploy from the `main` branch root. The form falls back to opening the visitor's email app.
- **Custom domain**: point your domain (for example the one used on Strikingly) to the host above.
