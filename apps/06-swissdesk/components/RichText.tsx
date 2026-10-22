const PHRASES = [
  "25+ concurrent upload jobs",
  "Read/Write/Bash tool-calling",
  "BSE-listed solar EPC firm",
  "40+ case regression suite",
  "production e-commerce backend",
  "4 core backend services",
  "data-integrity gaps",
  "full functional parity",
  "3 critical defects",
  "40+ test cases",
  "multi-year contract",
  "Razorpay",
  "Shiprocket",
  "PiixelTheory",
  "queue-based",
  "Dockerized",
  "no dropped tasks",
  "ReAct-style loop",
  "CodeCrafters",
  "15+ file operations",
  "50+ product entries",
  "sub-2-second lookup",
  "100+ student athletes",
  "4 inter-college tournaments",
  "3 technical events",
  "400+ participants",
  "5 sub-teams",
] as const;

const LOOKUP = new Set<string>(PHRASES.map((phrase) => phrase.toLowerCase()));

const PATTERN = new RegExp(
  `(${[...PHRASES]
    .sort((a, b) => b.length - a.length)
    .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})`,
  "gi",
);

export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(PATTERN).map((part, index) =>
        LOOKUP.has(part.toLowerCase()) ? (
          <strong key={index}>{part}</strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
