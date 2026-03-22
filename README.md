# Shelby Builder Showcase (ShelbyBS)

ShelbyBS is a community-run directory of real projects and the builders behind them. It highlights storage-focused apps, tools, and experiments built on Shelby, and makes it easy for teams to submit their work and for the community to discover and react to it.

## Why ShelbyBS

- **Showcase real work**: A curated place for projects shipping on Shelby.
- **Discover builders**: Profiles and links to the people behind each build.
- **Community signal**: Lightweight reactions and engagement to surface what matters.
- **Open contribution**: Issues and PRs welcome for improvements and fixes.

## How to submit a project

1. Open the site and click **Submit** in the header.
2. Fill out the project form with title, description, category, links, and builder details.
3. Submit. The project will appear in the showcase after review.

If you are running locally, ensure your Supabase env vars are set so the submission route can write to the database.

## How to create a GitHub issue

1. Go to the repository’s **Issues** tab.
2. Click **New issue**.
3. Provide:
   - A clear title
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots or logs if relevant
4. Submit the issue.

## How to open a pull request (PR)

1. Fork the repository and create a new branch:

```bash
git checkout -b fix/short-description
```

2. Make your changes and commit:

```bash
git add .
git commit -m "Fix: short description"
```

3. Push and open a PR:

```bash
git push origin fix/short-description
```

4. Open a pull request on GitHub, describe the change, and link any related issue.

## Local development

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Environment variables

Create `.env.local` with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Contributing

- Keep PRs focused and small.
- Match existing UI patterns and formatting.
- Add or update tests if you change logic.

## License

See the repository license file.
