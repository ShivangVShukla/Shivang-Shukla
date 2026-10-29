# Shivang Shukla — Developer Portfolio

A responsive, terminal-inspired, multi-page portfolio made with plain HTML, CSS, and vanilla JavaScript.

## Pages

- `index.html` — home and highlights
- `about.html` — introduction, skills, and education
- `projects.html` — projects with category filters
- `experience.html` — internship, event experience, achievements, and certification
- `contact.html` — email contact, message form, and resume link
- `thank-you.html` — confirmation page after a successful contact form submission

## Run locally

1. Extract the ZIP.
2. Open the `shivang-portfolio` folder in VS Code.
3. Open `index.html` in a browser, or use the Live Server extension.
4. Review the competitive-programming profile links in `about.html` and update them if needed.

## Publish with GitHub Pages

1. Create or open the GitHub repository where you want to publish the site.
2. Upload the contents of this folder to the repository root. Make sure `index.html` is at the root.
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then save.
6. Wait for GitHub Pages to publish. The URL will usually be `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

If you publish in a repository named `YOUR-USERNAME.github.io`, the site can use `https://YOUR-USERNAME.github.io/`.

## Before publishing

- Confirm the email address is correct and that you want it public.
- Verify the LeetCode, GeeksforGeeks, and CodeChef profile links in `about.html`.
- Review all project descriptions and update the WorkNest status as it progresses.
- The contact form uses Web3Forms and works on GitHub Pages without a server. Its access key is configured in `contact.html`; test submissions and confirm the recipient inbox before publishing.
- The form redirects to `thank-you.html` on the same deployment path after submission.
- The resume PDF is included at `assets/resume.pdf`.
- Google Fonts are loaded from the internet; system fallback fonts are included.

## Customization

Edit the CSS variables at the top of `assets/css/style.css` to change the palette. Update page content in the HTML files. Shared interactions are in `assets/js/main.js`.
