<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# rentify-client

Next.js 16.4 (App Router, Turbopack) + React 19 + TypeScript. UI is shadcn/ui
"base-nova" on Tailwind v4. Auth is Better Auth with a MongoDB adapter.

## Commands

- `npm run dev` - dev server on :3000. Auth requests need a running MongoDB at
  `mongodb://localhost:27017` (see Mongo note below).
- `npm run lint` - ESLint flat config. Next 16 removed `next lint`, so run the
  script; passing file paths after `--` works (`npm run lint -- app`).
- `npm run typecheck` - `tsc --noEmit`. Run before finishing changes.
- `npm run format` - Prettier, but only formats `*.ts`/`*.tsx` (not CSS/MD/JSON).
  Config: double quotes, no semicolons, LF, Tailwind class sorting via
  `prettier-plugin-tailwindcss`; `cn`/`cva` calls are sorted too.
- No test runner and no CI. Do not assume `npm test`; verify with
  `npm run lint && npm run typecheck` plus `npm run build` for routing/env issues.

## Architecture

- Path alias `@/*` maps to the repo root (not `src/`): `@/components`,
  `@/lib`, `@/hooks`, `@/app`.
- `app/layout.tsx` wires fonts and `app/globals.css`. This project is
  light-mode only: no theme provider, no `.dark` styles, and no `dark:`
  variants.
- Auth is split server/client:
  - `lib/auth.ts` - Better Auth server config; imported by
    `app/api/auth/[...all]/route.ts` via `toNextJsHandler`.
  - `lib/auth-client.ts` - browser client.
- Mongo is hardcoded in `lib/auth.ts`:
  `mongodb://localhost:27017/database`, db name `rentifydb`. There is no env
  var for it, so changes require editing that file.
- `lib/auth-client.ts` exports `authClient` (configured with
  `BETTER_AUTH_URL`) but also re-exports `signIn`/`signUp`/`useSession` from a
  second, unconfigured `createAuthClient()`. Prefer `authClient.*` when the base
  URL matters.
- Env: `.env` is gitignored and currently defines only `BETTER_AUTH_SECRET` and
  `BETTER_AUTH_URL`. `lib/auth.ts` also references `GOOGLE_CLIENT_ID` and
  `GOOGLE_CLIENT_SECRET`; without them the Google provider warns at build time
  (`Social provider google is missing clientId or clientSecret`).

## UI conventions

- shadcn style is `base-nova` (`components.json`): primitives come from
  `@base-ui/react`, **not Radix**. Base UI has no `asChild`; compose with the
  `render` prop (and `nativeButton` when rendering a non-`<button>`). Check
  `components/ui/button.tsx` before extending it.
- Add components with `npx shadcn@latest add <name>`; they land in
  `components/ui` and use the aliases in `components.json`.
- `cn` is the `cn` npm package, re-exported by `@/lib/utils`. Both
  `import { cn } from "@/lib/utils"` and `from "cn"` appear in the codebase.
- Tailwind v4 is CSS-first: theme tokens live in `app/globals.css`
  (`@theme inline`); there is no `tailwind.config.*`. Add design tokens there.
- Light mode only: do not introduce `next-themes`, `.dark` selectors, or
  `dark:` utility variants. `color-scheme: light` is set on `html`.

## Next 16 gotchas

- Middleware is renamed to Proxy: create root-level `proxy.ts`, not
  `middleware.ts`.
- Check version-matched docs under `node_modules/next/dist/docs/` before using
  framework APIs; training data is likely stale.
- The managed block at the top of this file is rewritten by `next dev`; keep it
  intact and put project notes below it.
