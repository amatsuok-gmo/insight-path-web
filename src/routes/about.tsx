import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aaron Matsuoka" },
      {
        name: "description",
        content:
          "Aaron Matsuoka is a private humanities tutor specializing in French & Francophone studies and English composition.",
      },
      { property: "og:title", content: "About — Aaron Matsuoka" },
      {
        property: "og:description",
        content:
          "Background, credentials, and teaching philosophy of Aaron Matsuoka.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="bg-ink py-24 text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <img
            src={portrait}
            alt="Portrait of Aaron Matsuoka in a library setting"
            width={896}
            height={1120}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-lg object-cover outline-1 -outline-offset-1 outline-white/5"
          />
        </div>
        <div className="flex flex-col justify-center md:col-span-8">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-rouge">
            About Aaron
          </p>
          <h1 className="mb-6 font-serif text-4xl md:text-5xl">
            Beyond Vocabulary
          </h1>
          <p className="mb-6 text-xl font-light italic leading-relaxed text-paper/80">
            "Language is not just a tool for communication, but a lens through
            which we view the world."
          </p>
          <div className="space-y-4 leading-relaxed text-paper/70">
            <p>
              With a background in Francophone studies and literary analysis, I
              help students bridge the gap between technical proficiency and
              cultural nuance. Whether you are navigating Molière, untangling
              the subjunctive, or mastering the persuasive essay, our work
              together is shaped around how you actually think.
            </p>
            <p>
              I take on a small number of students at a time so that lessons
              remain attentive and unhurried. Each session is built from the
              ground up around your particular goals — exam preparation,
              university coursework, professional writing, or the simple
              pleasure of reading better.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-paper/10 pt-8 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-rouge">
                Academic Background
              </p>
              <p className="text-sm text-paper/70">
                Graduate study in French & Francophone literature.
              </p>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-rouge">
                Experience
              </p>
              <p className="text-sm text-paper/70">
                Years of one-on-one and university-level instruction.
              </p>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-rouge">
                Languages
              </p>
              <p className="text-sm text-paper/70">
                English & French — taught and lived in both.
              </p>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-rouge">
                Students
              </p>
              <p className="text-sm text-paper/70">
                Secondary, university, and adult learners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
