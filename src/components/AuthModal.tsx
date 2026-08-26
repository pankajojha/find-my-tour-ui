import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAuth, firstName, type User } from "../lib/auth";
import { usePrefersReducedMotion } from "../lib/motion";
import { TICKER_PORTS } from "../data";
import { CompassMark, IconCheck, IconEye, IconArrowRight, IconAnchor } from "./icons";

type Mode = "signin" | "signup" | "forgot";
type Errors = { name?: string; email?: string; password?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RotatingPort() {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const ports = TICKER_PORTS.slice(0, 8);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % ports.length), 2200);
    return () => clearInterval(t);
  }, [reduced, ports.length]);
  return (
    <span key={i} className={reduced ? "" : "anim-rise"}>
      {ports[i]}
    </span>
  );
}

function Barcode() {
  const bars = [3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 1, 3, 2, 1];
  let x = 0;
  return (
    <svg viewBox="0 0 120 26" className="h-7 w-36 text-paper/70" aria-hidden="true">
      {bars.map((w, i) => {
        const rect = <rect key={i} x={x} y={0} width={w} height={26} fill="currentColor" />;
        x += w + 1.6;
        return rect;
      })}
    </svg>
  );
}

const GoogleG = () => (
  <svg viewBox="0 0 48 48" className="h-4.5 w-4.5" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
  </svg>
);

const AppleMark = () => (
  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702" />
  </svg>
);

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink/55">
        {label}
        {error && <span className="normal-case tracking-normal text-coral">{error}</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls = (hasError?: string) =>
  `w-full rounded-lg border bg-white px-4 py-3 text-[14.5px] text-ink outline-none transition-all duration-300 placeholder:text-ink/30 focus:ring-4 ${
    hasError
      ? "border-coral focus:border-coral focus:ring-coral/15"
      : "border-ink/15 focus:border-teal focus:ring-teal/15"
  }`;

export default function AuthModal() {
  const { view, close, signIn } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [flash, setFlash] = useState<User | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // reset + mode sync each time the modal opens
  useEffect(() => {
    if (!view) return;
    setMode(view);
    setName("");
    setPassword("");
    setErrors({});
    setLoading(false);
    setSent(false);
    setFlash(null);
    setShowPw(false);
    const t = setTimeout(() => emailRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [view]);

  // escape + scroll lock
  useEffect(() => {
    if (!view) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [view, close]);

  if (!view) return null;

  const switchMode = (m: Mode) => {
    setMode(m);
    setErrors({});
    setSent(false);
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (mode === "signup" && name.trim().length < 2) e.name = "required";
    if (!EMAIL_RE.test(email)) e.email = "valid email needed";
    if (mode !== "forgot" && password.length < 6) e.password = "min 6 characters";
    return e;
  };

  const finish = (u: User) => {
    setLoading(false);
    signIn(u);
    setFlash(u);
    setTimeout(() => {
      setFlash(null);
      close();
    }, 1300);
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (loading) return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setShakeKey((k) => k + 1);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (mode === "forgot") {
        setLoading(false);
        setSent(true);
        return;
      }
      const derived =
        mode === "signup"
          ? name.trim()
          : email
              .split("@")[0]
              .replace(/[._-]+/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()) || "Traveler";
      finish({ name: derived, email: email.trim() });
    }, 950);
  };

  const isSignin = mode === "signin";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      {/* overlay */}
      <button
        aria-label="Close sign in dialog"
        onClick={close}
        className="anim-overlay absolute inset-0 cursor-default bg-deep/85 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        className="anim-modal relative grid max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-paper/14 bg-hull shadow-lift sm:rounded-2xl md:grid-cols-[0.92fr_1.08fr] md:overflow-visible"
      >
        {/* ---- left: boarding-pass panel ---- */}
        <div className="relative hidden overflow-hidden rounded-l-2xl bg-deep p-8 md:flex md:flex-col">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 45% at 20% 12%, rgb(20 166 151 / 0.16), transparent 70%), radial-gradient(55% 45% at 90% 95%, rgb(255 92 57 / 0.12), transparent 70%)",
            }}
            aria-hidden="true"
          />
          <svg className="pointer-events-none absolute inset-x-0 top-1/3 h-40 w-full opacity-70" viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-10 130 C 80 40, 200 150, 410 40" fill="none" stroke="rgb(255 92 57 / 0.4)" strokeWidth="1.5" strokeDasharray="5 10" className="dash-flow" />
          </svg>

          <div className="relative flex items-center gap-2.5">
            <CompassMark className="h-8 w-8" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-paper/70">
              Crew access
            </span>
          </div>

          <div className="relative mt-10">
            <h2 id="auth-title" className="font-display text-[2.1rem] font-semibold leading-[1.06] tracking-tight text-paper">
              Welcome
              <br />
              <em className="font-light italic text-coral">aboard.</em>
            </h2>
            <p className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
              <IconAnchor className="h-4 w-4" />
              Now boarding · <RotatingPort />
            </p>
          </div>

          <ul className="relative mt-auto space-y-3 border-t border-dashed border-paper/20 pt-6">
            {[
              ["38k", "trip plans drafted"],
              ["2,300+", "excursions curated"],
              ["0", "PII sent to the AI"],
            ].map(([v, l]) => (
              <li key={l} className="flex items-baseline gap-3">
                <span className="font-display text-[1.25rem] font-semibold text-paper">{v}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/45">{l}</span>
              </li>
            ))}
            <li className="flex items-center justify-between pt-3">
              <Barcode />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">
                Gate E-77
              </span>
            </li>
          </ul>
        </div>

        {/* ---- right: form panel ---- */}
        <div className="relative bg-mist p-7 text-ink sm:p-9">
          {/* success flash */}
          {flash && (
            <div className="anim-modal absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-mist px-8 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal/15 text-teal">
                <IconCheck className="h-8 w-8" />
              </span>
              <p className="font-display text-[1.7rem] font-semibold tracking-tight">
                Welcome, {firstName(flash.name)}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
                Charting your trips…
              </p>
              <div className="mt-2 h-1 w-40 overflow-hidden rounded-full bg-ink/10">
                <div className="animate-budgetfill h-full w-full rounded-full bg-coral" />
              </div>
            </div>
          )}

          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-all duration-300 hover:rotate-90 hover:border-coral hover:text-coral"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* mobile brand row */}
          <div className="mb-6 flex items-center gap-2.5 md:hidden">
            <CompassMark className="h-7 w-7" />
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-ink/55">
              FindMyTour.AI · Crew access
            </span>
          </div>

          {/* tabs / forgot header */}
          {mode === "forgot" ? (
            <button
              onClick={() => switchMode("signin")}
              className="link-underline mb-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-teal"
            >
              ← Back to sign in
            </button>
          ) : (
            <div className="relative mb-8 grid w-fit grid-cols-2 rounded-full border border-ink/15 bg-white p-1">
              <span
                className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: mode === "signup" ? "translateX(calc(100% + 0px))" : "translateX(0)" }}
                aria-hidden="true"
              />
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  aria-pressed={mode === m}
                  className={`relative z-10 rounded-full px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                    mode === m ? "text-paper" : "text-ink/55 hover:text-ink"
                  }`}
                >
                  {m === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>
          )}

          <h3 className="font-display text-[1.65rem] font-semibold tracking-tight">
            {mode === "signin" && "Good to see you again."}
            {mode === "signup" && "Start your first trip plan."}
            {mode === "forgot" && "Reset your password."}
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink/60">
            {mode === "signin" && "Pick up your itineraries, checklists and group plans where you left off."}
            {mode === "signup" && "Two free trip plans included — no card needed to board."}
            {mode === "forgot" && "Tell us your email and we'll send a reset link within a minute."}
          </p>

          {sent ? (
            <div className="anim-rise mt-8 rounded-xl border border-teal/30 bg-teal/8 p-6 text-center">
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-teal/15 text-teal">
                <IconCheck className="h-6 w-6" />
              </span>
              <p className="font-display text-[1.15rem] font-semibold">Reset link sent</p>
              <p className="mt-1.5 text-[13px] text-ink/60">
                Check <span className="font-semibold text-ink">{email}</span> — the link expires in 30 minutes.
              </p>
            </div>
          ) : (
            <form key={shakeKey} onSubmit={onSubmit} className={`mt-7 space-y-5 ${Object.keys(errors).length ? "animate-shake" : ""}`} noValidate>
              {mode === "signup" && (
                <Field label="Full name" error={errors.name}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Amelia Wren"
                    autoComplete="name"
                    className={inputCls(errors.name)}
                  />
                </Field>
              )}

              <Field label="Email" error={errors.email}>
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amelia@wrenfamily.com"
                  autoComplete="email"
                  className={inputCls(errors.email)}
                />
              </Field>

              {mode !== "forgot" && (
                <Field label="Password" error={errors.password}>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === "signup" ? "At least 6 characters" : "Your password"}
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                      className={`${inputCls(errors.password)} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                      className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors hover:text-teal ${showPw ? "text-teal" : "text-ink/40"}`}
                    >
                      <IconEye className="h-5 w-5" />
                    </button>
                  </div>
                </Field>
              )}

              {isSignin && (
                <div className="flex items-center justify-between pt-0.5">
                  <button
                    type="button"
                    onClick={() => setRemember((v) => !v)}
                    className="flex items-center gap-2.5 text-[13px] text-ink/65 transition-colors hover:text-ink"
                    aria-pressed={remember}
                  >
                    <span
                      className={`flex h-[18px] w-[18px] items-center justify-center rounded border transition-all duration-300 ${
                        remember ? "border-teal bg-teal text-deep" : "border-ink/30 bg-white"
                      }`}
                    >
                      {remember && <IconCheck className="h-3 w-3" />}
                    </span>
                    Keep me signed in
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode("forgot")}
                    className="link-underline text-[13px] font-medium text-coral"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-arrow group mt-2 flex w-full items-center justify-center gap-2.5 rounded-full bg-coral px-6 py-3.5 text-[14.5px] font-semibold text-deep transition-all duration-300 hover:bg-ember hover:shadow-[0_12px_30px_-10px_rgb(255_92_57/0.6)] disabled:cursor-wait disabled:opacity-80"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-deep/30 border-t-deep" />
                    {mode === "forgot" ? "Sending link…" : "Boarding…"}
                  </>
                ) : (
                  <>
                    {mode === "signin" && "Sign in"}
                    {mode === "signup" && "Create account"}
                    {mode === "forgot" && "Send reset link"}
                    <IconArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          )}

          {mode !== "forgot" && !sent && (
            <>
              <div className="my-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-ink/12" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">or continue with</span>
                <span className="h-px flex-1 bg-ink/12" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => finish({ name: "Google Traveler", email: "you@gmail.com" })}
                  className="flex items-center justify-center gap-2.5 rounded-full border border-ink/18 bg-white px-4 py-3 text-[13.5px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-card"
                >
                  <GoogleG /> Google
                </button>
                <button
                  onClick={() => finish({ name: "Apple Traveler", email: "you@icloud.com" })}
                  className="flex items-center justify-center gap-2.5 rounded-full border border-ink/18 bg-white px-4 py-3 text-[13.5px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-card"
                >
                  <AppleMark /> Apple
                </button>
              </div>
            </>
          )}

          <p className="mt-6 text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-ink/40">
            Protected by the privacy-safe data boundary
            <br />
            <span className="text-teal">PII &amp; PCI never reach the AI</span>
          </p>
        </div>
      </div>
    </div>
  );
}
