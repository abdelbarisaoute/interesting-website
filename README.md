# My Personal Website

A minimalistic, dynamic personal website featuring:

## Features

- **Articles Page**: Browse and search through blog articles
- **About Me**: Resume and personal information
- **Projects**: Portfolio of projects with detailed descriptions
- **Search Functionality**: Search across articles and projects
- **Responsive Design**: Works on all devices
- **GitHub Pages Deployment**: Automatically deploys on push to main

## Structure

- `index.html` - Home page with search and previews
- `articles.html` - Articles listing page
- `about.html` - About me and resume
- `projects.html` - Projects showcase
- `styles.css` - Minimalistic styling
- `script.js` - Dynamic content loading and search
- `data/` - JSON files for articles and projects

## Deployment

This website is configured to deploy automatically to GitHub Pages when changes are pushed to the main branch.

### Setup GitHub Pages:

1. Go to your repository settings on GitHub
2. Navigate to "Pages" section in the left sidebar
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
4. Save the settings
5. Push any changes to the `main` branch to trigger a deployment
6. The workflow will automatically build and deploy your site
7. Your site will be available at: `https://<username>.github.io/<repository-name>/`

**Note**: Make sure your repository is public or you have GitHub Pro/Enterprise for private repo Pages deployment.

## Local Development

Simply open `index.html` in a web browser to view locally.

## Customization

- Edit `data/articles.json` to add/modify articles
- Edit `data/projects.json` to add/modify projects
- Update `about.html` to customize your resume
- Modify `styles.css` for styling changes
