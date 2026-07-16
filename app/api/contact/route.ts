import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

// POST /api/contact — receives the contact form, RE-VALIDATES with the same Zod
// schema the client uses (never trust the client), silently drops honeypot spam,
// then sends via Resend. Server-side only: RESEND_API_KEY is read from env and
// never reaches the client. Typed JSON + real status codes; Resend errors are
// surfaced, not swallowed.

export const runtime = "nodejs";

type Ok = { ok: true; id?: string | null; delivered: boolean };
type Err = { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function POST(req: Request): Promise<NextResponse<Ok | Err>> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  // Honeypot: if the hidden field is filled, it's a bot. Return a normal-looking
  // success so we don't tip off scrapers, but do not send anything.
  if (
    body &&
    typeof body === "object" &&
    "website" in body &&
    typeof (body as { website: unknown }).website === "string" &&
    (body as { website: string }).website.trim().length > 0
  ) {
    return NextResponse.json({ ok: true, delivered: false }, { status: 200 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please fix the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<
          string,
          string[]
        >,
      },
      { status: 422 },
    );
  }

  const { firstName, lastName, email, business, service, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    // Misconfiguration is our fault, not the sender's — surface it, don't swallow.
    return NextResponse.json(
      { ok: false, error: "Email delivery is not configured on the server." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New project inquiry — ${firstName} ${lastName}`,
    text: [
      `Name:     ${firstName} ${lastName}`,
      `Email:    ${email}`,
      `Business: ${business || "—"}`,
      `Service:  ${service || "—"}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Resend failed to send the message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: data?.id, delivered: true }, { status: 200 });
}
