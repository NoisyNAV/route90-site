import { Section } from "@/components/shared/Section";
import { ShieldBadge } from "@/components/shared/ShieldBadge";
import { SnapIn } from "@/components/shared/SnapIn";
import { site } from "@/data/site";

// Chapter 05 — Contact. Forest field. Shield + "ROUTE 90 / DIGITAL SOLUTIONS"
// wordmark and the tagline, then a two-column layout: the contact details block
// (phone, email, location, hours from data/site.ts) on the left, and a RESERVED
// slot for the contact form on the right — the form itself (React Hook Form +
// Zod + Resend) is Phase 8; here it is only a bordered placeholder holding the
// layout space so the section reads complete. Footer bar renders separately.
export function ContactSection() {
  const { contact, footer } = site;

  const details = [
    { label: "Phone", value: footer.phone },
    { label: "Email", value: footer.email },
    { label: "Location", value: footer.location },
    { label: "Hours", value: footer.hours },
  ];

  return (
    <Section id="contact" tone="forest">
      <SnapIn>
        <div className="flex items-center gap-3">
          <ShieldBadge size={28} />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-mustard sm:text-sm">
            {contact.eyebrow}
          </span>
        </div>

        <h2 className="mt-8 font-display uppercase leading-[0.85] tracking-tighter text-cream">
          <span className="block text-6xl sm:text-8xl">{contact.headline}</span>
          <span className="block text-3xl text-mustard sm:text-5xl">
            {contact.sub}
          </span>
        </h2>

        <p className="mt-8 max-w-xl font-body leading-relaxed text-cream/85 sm:text-lg">
          {contact.body}
        </p>
      </SnapIn>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Contact details block */}
        <dl className="grid grid-cols-1 border-2 border-cream sm:grid-cols-2">
          {details.map((d, i) => (
            <div
              key={d.label}
              className={`p-5 sm:p-6 ${i % 2 === 0 ? "sm:border-r-2 sm:border-cream" : ""} ${
                i < details.length - (details.length % 2 === 0 ? 2 : 1)
                  ? "border-b-2 border-cream"
                  : ""
              }`}
            >
              <dt className="font-mono text-xs uppercase tracking-widest text-mustard">
                {d.label}
              </dt>
              <dd className="mt-2 font-display text-lg uppercase tracking-tight text-cream sm:text-xl">
                {d.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Form placeholder slot — Phase 8 */}
        <div className="flex flex-col gap-4 border-2 border-dashed border-cream/50 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-mustard">
            Contact form — reserved
          </p>
          <ul className="flex flex-col gap-3 opacity-60">
            {[
              contact.fields.name,
              contact.fields.email,
              contact.fields.business,
              contact.fields.chapter,
              contact.fields.message,
            ].map((label) => (
              <li
                key={label}
                className="border-2 border-cream/60 px-4 py-3 font-mono text-xs uppercase tracking-widest text-cream/70"
              >
                {label}
              </li>
            ))}
            <li className="w-fit border-2 border-mustard bg-mustard/70 px-5 py-2 font-display text-sm uppercase tracking-wide text-ink">
              {contact.submit}
            </li>
          </ul>
          <p className="mt-auto font-mono text-[0.65rem] uppercase tracking-widest text-cream/50">
            Wiring + Resend delivery — Phase 8.
          </p>
        </div>
      </div>
    </Section>
  );
}
