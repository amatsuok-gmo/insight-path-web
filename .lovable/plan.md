
## Overview

A four-page editorial tutoring website for Aaron Matsuoka in the "Modern academic editorial" direction (cream paper, ink navy, rouge accent, Playfair Display + Inter). Lead inquiries from the sign-up page are stored in a database via Lovable Cloud.

## Pages & routing

File-based routes under `src/routes/`:

```text
__root.tsx       -> shared nav + footer + global head (fonts, base meta)
index.tsx        -> /         Home / landing
about.tsx        -> /about    About Me
pedagogy.tsx     -> /pedagogy Pedagogical Approach
signup.tsx       -> /signup   Sign Up (lead form)
```

Each route gets its own `head()` with a unique title, description, og:title, og:description. Nav lives in `__root.tsx` using TanStack `<Link>` with `activeProps` for current-page styling.

### Home (`/`)
- Hero: serif H1 "Cultivating *clarity* in language and thought.", lede, three subject pills (French Language, Francophone Studies, English & Composition), warm study image (generated).
- Brief teaser blocks for the two subject areas linking to /about and /pedagogy.
- Single CTA → /signup.

### About (`/about`)
- Dark ink-navy section with portrait (generated placeholder image), bio prose, pull-quote in italics, credentials grid (degrees, years of experience).

### Pedagogy (`/pedagogy`)
- "Teaching Philosophy" heading + rouge divider, then 3 numbered principle blocks (Contextual Immersion, Critical Inquiry, The Spoken Word), as in the chosen direction.

### Sign Up (`/signup`)
- White card on cream, serif heading "Begin your studies".
- Form: Name (text), Email (email), Goals (textarea).
- Validated with zod (client) and again server-side; on submit calls a server function that writes to the database; shows success/error state via `sonner` toast and resets form.

## Design system

Update `src/styles.css` to replace shadcn defaults with the chosen tokens (all in oklch):
- `--background` = paper (#F9F7F2), `--foreground` = ink (#1A2E3B)
- `--primary` = rouge (#C44536), with matching foreground
- `--muted` = stone-muted (#E8E2D6)
- `--font-serif` = Playfair Display, `--font-sans` = Inter
- Load fonts via `<link>` in `__root.tsx` head (NOT via CSS @import).
- Add `--color-paper`, `--color-ink`, `--color-rouge`, `--color-stone-muted` so utilities `bg-paper`, `text-rouge`, etc. work verbatim from the prototype.

All components reference semantic tokens — no hex literals in JSX.

## Backend (Lovable Cloud)

Enable Lovable Cloud, then create one table via migration:

```sql
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  goals text not null,
  created_at timestamptz not null default now()
);

-- writes happen only via service_role from a server function
grant all on public.inquiries to service_role;

alter table public.inquiries enable row level security;
-- no policies for anon/authenticated → no client-side reads or writes
```

### Server function
`src/lib/inquiries.functions.ts` exports `submitInquiry = createServerFn({ method: "POST" })` that:
- Validates input with zod: `name` (1–100 chars, trimmed), `email` (valid email, ≤255), `goals` (1–2000 chars, trimmed).
- Lazily imports `supabaseAdmin` inside the handler and inserts into `public.inquiries`.
- Returns `{ ok: true }` or throws a friendly error.

The form page calls it via `useServerFn(submitInquiry)`.

## Assets

Generate two images into `src/assets/`:
1. Warm minimalist study with books and a French window (hero).
2. Scholarly portrait placeholder for the About page (clearly framed as a stand-in until Aaron supplies a real photo).

## Out of scope

- No authentication / user accounts (lead form only, per your answer).
- No admin dashboard to view submissions in this pass — submissions live in the `inquiries` table and can be viewed via Lovable Cloud's data viewer. We can add an admin page later if you want.
