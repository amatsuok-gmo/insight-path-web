import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-ink">404</h1>
        <h2 className="mt-4 font-serif text-xl text-ink">Page not found</h2>
        <p className="mt-2 text-sm text-ink/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-widest text-paper transition-colors hover:bg-rouge"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-ink">This page didn't load</h1>
        <p className="mt-2 text-sm text-ink/60">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-widest text-paper transition-colors hover:bg-rouge"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-stone-muted bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:border-rouge hover:text-rouge"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aaron Matsuoka — Private Tutoring in French & English" },
      {
        name: "description",
        content:
          "Private humanities tutoring with Aaron Matsuoka. French language and Francophone studies, English composition and rhetoric.",
      },
      { name: "author", content: "Aaron Matsuoka" },
      { property: "og:title", content: "Aaron Matsuoka — Private Humanities Tutoring" },
      {
        property: "og:description",
        content:
          "Private tutoring in French & Francophone studies and English composition.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Header() {
  const linkBase = "text-xs uppercase tracking-widest font-semibold transition-colors";
  return (
    <nav className="sticky top-0 z-50 border-b border-stone-muted bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="font-serif text-lg italic font-bold tracking-tight text-ink hover:text-rouge transition-colors"
        >
          Aaron Matsuoka
        </Link>
        <div className="hidden gap-8 md:flex">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className={`${linkBase} text-ink hover:text-rouge`}
            activeProps={{ className: `${linkBase} text-rouge underline underline-offset-4` }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`${linkBase} text-ink hover:text-rouge`}
            activeProps={{ className: `${linkBase} text-rouge underline underline-offset-4` }}
          >
            About
          </Link>
          <Link
            to="/pedagogy"
            className={`${linkBase} text-ink hover:text-rouge`}
            activeProps={{ className: `${linkBase} text-rouge underline underline-offset-4` }}
          >
            Pedagogy
          </Link>
          <Link
            to="/signup"
            className={`${linkBase} text-rouge underline underline-offset-4`}
            activeProps={{ className: `${linkBase} text-rouge underline underline-offset-4` }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-muted py-12 text-center">
      <p className="text-[10px] uppercase tracking-widest text-ink/40">
        © {new Date().getFullYear()} Aaron Matsuoka — Private Humanities Tutoring
      </p>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: "var(--font-sans)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
