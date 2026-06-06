import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyO6g0m27GvfdEZ3uiIsoR_x5dNx7BvbdZDYTzxpTcH72oD1olfTnnA1W_Xb_Lu-1WD/exec";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — Aaron Matsuoka Tutoring" },
      {
        name: "description",
        content:
          "Inquire about private tutoring with Aaron Matsuoka. Share your name, email, and learning goals.",
      },
      { property: "og:title", content: "Sign Up — Aaron Matsuoka Tutoring" },
      {
        property: "og:description",
        content:
          "Submit a tutoring inquiry with your name, email, and learning goals.",
      },
    ],
  }),
  component: SignupPage,
});

const clientSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  goals: z
    .string()
    .trim()
    .min(1, "Tell me a little about your goals")
    .max(2000, "Please keep it under 2000 characters"),
});

type Errors = Partial<Record<"name" | "email" | "goals", string>>;

function SignupPage() {
  const [values, setValues] = useState({ name: "", email: "", goals: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);

  const update = (field: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = clientSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setPending(true);
    try {
      await submit({ data: parsed.data });
      toast.success("Inquiry received", {
        description: "Aaron will be in touch shortly.",
      });
      setValues({ name: "", email: "", goals: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", {
        description:
          err instanceof Error
            ? err.message
            : "Please try again in a moment.",
      });
    } finally {
      setPending(false);
    }
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-rouge ${
      hasError ? "border-destructive" : "border-stone-muted"
    }`;

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-3xl border border-stone-muted bg-white p-8 shadow-sm md:p-12">
          <div className="mb-10 text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-rouge">
              Inquiry
            </p>
            <h1 className="font-serif text-3xl md:text-4xl">
              Begin your studies
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/60">
              Share a few details about what you're hoping to work on and I'll
              follow up by email to discuss next steps.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-[10px] font-bold uppercase tracking-widest text-ink/50"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={update("name")}
                  className={fieldClass(Boolean(errors.name))}
                  placeholder="Jean-Luc Godard"
                  maxLength={100}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-[10px] font-bold uppercase tracking-widest text-ink/50"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={update("email")}
                  className={fieldClass(Boolean(errors.email))}
                  placeholder="jean@nouvellevague.fr"
                  maxLength={255}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="goals"
                className="block text-[10px] font-bold uppercase tracking-widest text-ink/50"
              >
                Your Learning Goals
              </label>
              <textarea
                id="goals"
                name="goals"
                rows={5}
                value={values.goals}
                onChange={update("goals")}
                className={`${fieldClass(Boolean(errors.goals))} resize-none`}
                placeholder="Briefly describe your current level, the subject(s) you'd like to focus on, and what you hope to achieve."
                maxLength={2000}
              />
              {errors.goals && (
                <p className="text-xs text-destructive">{errors.goals}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-ink py-4 text-xs font-bold uppercase tracking-widest text-paper transition-all hover:bg-rouge disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Submitting…" : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
