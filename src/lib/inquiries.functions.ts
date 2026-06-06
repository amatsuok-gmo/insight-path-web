import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email").max(255),
  goals: z
    .string()
    .trim()
    .min(1, "Please share a few words about your goals")
    .max(2000, "Please keep your message under 2000 characters"),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("inquiries").insert({
      name: data.name,
      email: data.email,
      goals: data.goals,
    });
    if (error) {
      console.error("[inquiries] insert failed", error);
      throw new Error("We couldn't save your inquiry. Please try again shortly.");
    }
    return { ok: true as const };
  });
