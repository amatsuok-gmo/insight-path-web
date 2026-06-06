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

const SPREADSHEET_ID = "1Jm5kAPAN1zV4HgAjagiKe4RK-MUcZSHgacK8QQqId7s";
const SHEET_RANGE = "Sheet1!A:D";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const connectionKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!lovableKey || !connectionKey) {
      console.error("[inquiries] missing gateway credentials");
      throw new Error("Server is not configured to receive inquiries yet.");
    }

    const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": connectionKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[new Date().toISOString(), data.name, data.email, data.goals]],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[inquiries] sheets append failed", res.status, body);
      throw new Error("We couldn't save your inquiry. Please try again shortly.");
    }

    return { ok: true as const };
  });
