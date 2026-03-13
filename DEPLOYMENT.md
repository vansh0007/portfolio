# Deployment Guide - GitHub Pages

This portfolio is configured for easy deployment to GitHub Pages.

## Automated Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically builds and deploys your portfolio whenever you push to the `main` or `master` branch.

### Setup:
1. Push your code to GitHub
2. The workflow will automatically run and deploy to GitHub Pages
3. Your site will be available at `https://vansh0007.github.io/portfolio/`

## Manual Deployment

If you prefer to deploy manually:

```bash
npm run deploy
```

This command will:
1. Build the production bundle
2. Create a commit with the dist folder
3. Push to the `gh-pages` branch

## Repository Settings

Make sure your GitHub repository settings are configured:

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select the branch `gh-pages` and folder `/ (root)`
5. Click Save

## Build and Preview Locally

To test the build locally:

```bash
npm run build
npm run preview
```

## Important Notes

- The base path is set to `/portfolio/` in `vite.config.ts`
- All internal links should work correctly with this base path
- The GitHub Actions workflow uses Node.js 18.x
- Deployments happen automatically on push to main/master branch

## Troubleshooting

**Site not loading?**
- Make sure the `gh-pages` branch exists and is selected in GitHub Pages settings
- Clear your browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check GitHub Actions tab for any workflow failures

**Styles/assets not loading?**
- Verify that the base path `/portfolio/` is correctly set in vite.config.ts
- Check browser console for 404 errors on asset paths
