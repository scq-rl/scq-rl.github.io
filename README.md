# SCQ Project Website

Static project website for **SCQ: Stabilizing Conservative Q-Learning with
Sigmoid-Bounded Entropy**.

## Local preview

```bash
cd /home/xiefengw/bean_first_pc/rl_websites/scq-rl.github.io
python -m http.server 8000
```

Open `http://localhost:8000` in a browser.

## Release checklist

Before publishing, update the `project` object at the top of
`assets/site.js` with the confirmed author names, affiliations, paper URL,
appendix URL, and code URL. The local paper source currently uses anonymous
submission metadata, so no author names are inferred by this template.

For GitHub Pages, publish the `main` branch from the repository root in
**Settings → Pages**.
