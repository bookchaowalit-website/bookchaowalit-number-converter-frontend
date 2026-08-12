"use client";

import { useState, type ReactNode } from "react";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function Shell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Client-side utility · no server required
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </header>
        {children}
        <footer className="mt-10 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          Data stays in your browser. Part of the Bookchaowalit developer tools portfolio.
        </footer>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      : variant === "secondary"
        ? "bg-white text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800"
        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900";
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-zinc-500">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 font-mono text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100";
const areaClass = `${inputClass} min-h-[160px] resize-y`;

type Base = "bin" | "oct" | "dec" | "hex";

const RADIX: Record<Base, number> = { bin: 2, oct: 8, dec: 10, hex: 16 };

export default function Home() {
  const [values, setValues] = useState<Record<Base, string>>({
    bin: "1010",
    oct: "12",
    dec: "10",
    hex: "a",
  });
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<Base | null>(null);

  const updateFrom = (base: Base, raw: string) => {
    setValues((prev) => ({ ...prev, [base]: raw }));
    if (!raw.trim()) {
      setError("");
      setValues({ bin: "", oct: "", dec: "", hex: "" });
      return;
    }
    try {
      const n = BigInt(parseIntSafe(raw.trim(), RADIX[base]));
      setError("");
      setValues({
        bin: n.toString(2),
        oct: n.toString(8),
        dec: n.toString(10),
        hex: n.toString(16),
      });
    } catch {
      setError(`Invalid ${base} value`);
    }
  };

  function parseIntSafe(s: string, radix: number): bigint {
    let cleaned = s.trim();
    let neg = false;
    if (cleaned.startsWith("-")) {
      neg = true;
      cleaned = cleaned.slice(1);
    }
    if (radix === 16) cleaned = cleaned.replace(/^0x/i, "");
    if (radix === 2 && !/^[01]+$/.test(cleaned)) throw new Error("bad");
    if (radix === 8 && !/^[0-7]+$/.test(cleaned)) throw new Error("bad");
    if (radix === 10 && !/^\d+$/.test(cleaned)) throw new Error("bad");
    if (radix === 16 && !/^[0-9a-fA-F]+$/.test(cleaned)) throw new Error("bad");
    let n = BigInt(0);
    const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
    for (const ch of cleaned.toLowerCase()) {
      const d = BigInt(digits.indexOf(ch));
      if (d < BigInt(0) || d >= BigInt(radix)) throw new Error("bad");
      n = n * BigInt(radix) + d;
    }
    return neg ? -n : n;
  }

  return (
    <Shell title="Number Base Converter" subtitle="Translate integers between binary, octal, decimal, and hex as you type.">
      <div className="grid gap-4 sm:grid-cols-2">
        {(
          [
            ["bin", "Binary (base 2)"],
            ["oct", "Octal (base 8)"],
            ["dec", "Decimal (base 10)"],
            ["hex", "Hexadecimal (base 16)"],
          ] as const
        ).map(([key, label]) => (
          <Field key={key} label={label}>
            <div className="flex gap-2">
              <input
                className={inputClass}
                value={values[key]}
                onChange={(e) => updateFrom(key, e.target.value)}
                spellCheck={false}
              />
              <Button
                variant="secondary"
                onClick={async () => {
                  if (await copyText(values[key])) {
                    setCopied(key);
                    setTimeout(() => setCopied(null), 1500);
                  }
                }}
              >
                {copied === key ? "✓" : "Copy"}
              </Button>
            </div>
          </Field>
        ))}
      </div>
      {error ? <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p> : null}
    </Shell>
  );
}
