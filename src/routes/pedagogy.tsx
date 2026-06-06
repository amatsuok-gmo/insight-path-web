import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pedagogy")({
  head: () => ({
    meta: [
      { title: "Pedagogical Approach — Aaron Matsuoka" },
      {
        name: "description",
        content:
          "The teaching philosophy behind Aaron Matsuoka's private tutoring: contextual immersion, critical inquiry, and the spoken word.",
      },
      { property: "og:title", content: "Pedagogical Approach — Aaron Matsuoka" },
      {
        property: "og:description",
        content:
          "Three principles guiding private tutoring in French and English: contextual immersion, critical inquiry, the spoken word.",
      },
    ],
  }),
  component: PedagogyPage,
});

const principles = [
  {
    number: "01.",
    title: "Contextual Immersion",
    body: "Grammar is taught through the lens of history and culture. Rules become memorable when they're tied to the writers, debates, and moments that gave them weight — so the mechanics of language feel alive and relevant.",
  },
  {
    number: "02.",
    title: "Critical Inquiry",
    body: "In composition tutoring, we prioritize the development of a thesis that challenges assumptions and invites dialogue. Strong writing begins with a question worth asking, not with a template to fill in.",
  },
  {
    number: "03.",
    title: "The Spoken Word",
    body: "Phonetics and fluid expression are integrated from day one. Reading aloud, recitation, and conversation build confidence and rhythmic intuition — qualities the page alone cannot teach.",
  },
];

function PedagogyPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16 text-center">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-rouge">
          Approach
        </p>
        <h1 className="mb-4 font-serif text-4xl md:text-5xl">
          Teaching Philosophy
        </h1>
        <div className="mx-auto h-px w-24 bg-rouge" />
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink/70">
          Three principles guide how I work with every student, whether the
          subject is the conditional tense or the structure of an argument.
        </p>
      </div>
      <div className="grid gap-12 md:grid-cols-3">
        {principles.map((p) => (
          <article key={p.number} className="space-y-4">
            <span className="block font-serif text-3xl italic text-rouge">
              {p.number}
            </span>
            <h2 className="text-sm font-bold uppercase tracking-widest">
              {p.title}
            </h2>
            <p className="text-sm leading-relaxed text-ink/70">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
