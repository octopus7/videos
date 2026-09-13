# Agent instructions

## Project overview

- This repository is an Astro static site deployed through Cloudflare Pages.
- Cloudflare Pages build command: `npm run build`.
- Cloudflare Pages output directory: `dist`.
- Video assets live under `public/videos/` and are discovered at build time.
- Do not commit `node_modules/`, `dist/`, or `.astro/`.

## npm and registry access

The local sandbox may reject npm registry requests with `EACCES` even when the project files are writable. If `npm install` or another npm command fails with a registry/network permission error:

1. Do not change the registry, delete the lockfile, or switch package managers.
2. Retry the same npm command with an approved external/escalated execution because the dependency must be fetched from `https://registry.npmjs.org/`.
3. Keep `package-lock.json` in sync with `package.json` and do not commit `node_modules/`.

## Astro build verification

On this Windows workspace, Astro telemetry may fail when it tries to create its config under the user AppData directory. Run the build with telemetry disabled:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
npm run build
```

The build must complete successfully before reporting a deployment-ready change.

## Git workflow

- Preserve the existing `main` branch unless the user requests another branch.
- Run `git diff --check` and `npm run build` before committing.
- When the user explicitly requests a push, push the verified commit to `origin/main` and confirm that local `HEAD` matches `origin/main`.
