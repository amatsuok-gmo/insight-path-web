import { createFileRoute, Link } from "@tanstack/react-router";
import heroStudy from "@/assets/hero-study.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aaron Matsuoka — Private Tutoring in French & English" },
      {
        name: "description",
        content:
          "Private humanities tutoring with Aaron Matsuoka in French language, Francophone studies, and English composition.",
      },
      {
        property: "og:title",
        content: "Aaron Matsuoka — Private Tutoring in French & English",
      },
      {
        property: "og:description",
        content:
          "Private humanities tutoring in French language, Francophone studies, and English composition.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="mb-6 font-serif text-5xl leading-[1.1] text-balance md:text-7xl">
              Cultivating <span className="italic text-rouge">clarity</span> in
              language and thought.
            </h1>
            <p className="mb-8 max-w-md text-lg leading-relaxed text-ink/70">
              Specialized tutoring in French linguistics, Francophone culture,
              and the art of English composition.
            </p>
            <div className="mb-10 flex flex-wrap gap-3">
              <span className="rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-medium">
                French Language
              </span>
              <span className="rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-medium">
                Francophone Studies
              </span>
              <span className="rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-medium">
                English & Composition
              </span>
            </div>
            <Link
              to="/signup"
              className="inline-flex items-center bg-ink px-8 py-4 text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-rouge"
            >
              Begin your studies
            </Link>
          </div>
          <div className="relative">
            <img
              src={heroStudy}
              alt="A warmly lit study with stacked books, a fountain pen and notebook beside a French window"
              width={1080}
              height={1350}
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-sm outline-1 -outline-offset-1 outline-black/5"
            />
          </div>
        </div>
      </section>

      {/* Subject teaser */}
      <section className="border-t border-stone-muted bg-white/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-12 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-rouge">
            Two Disciplines, One Method
          </p>
          <div className="grid gap-12 md:grid-cols-2">
            <article className="space-y-4">
              <h2 className="font-serif text-3xl">
                French & Francophone Studies
              </h2>
              <p className="leading-relaxed text-ink/70">
                Comprehensive instruction from foundational grammar through
                contemporary literature and culture — taught with attention to
                stylistic precision and the cultural nuance that animates the
                language.
              </p>
              <Link
                to="/pedagogy"
                className="inline-block text-xs font-bold uppercase tracking-widest text-rouge underline underline-offset-4 hover:text-ink"
              >
                See the approach →
              </Link>
            </article>
            <article className="space-y-4">
              <h2 className="font-serif text-3xl">English & Composition</h2>
              <p className="leading-relaxed text-ink/70">
                Refining the craft of the essay through close reading, logical
                structure, and the steady development of a distinct rhetorical
                voice — for students at every academic stage.
              </p>
              <Link
                to="/about"
                className="inline-block text-xs font-bold uppercase tracking-widest text-rouge underline underline-offset-4 hover:text-ink"
              >
                About Aaron →
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
