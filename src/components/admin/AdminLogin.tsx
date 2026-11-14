/* eslint-disable react-refresh/only-export-components -- Keep admin auth helpers with the login component. */
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpenText,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import { building, logo } from "@/data/photos";

const SCHOOL_NAME = "Alokdia High School";

export type AdminUser = {
  id: string;
  username: string;
  role: "superadmin" | "admin";
  status: "active" | "pending";
};

const DATABASE_API = `http://${typeof window === "undefined" ? "127.0.0.1" : window.location.hostname}:8765/api`;

export async function adminApi<T>(path: string, body?: unknown, method = "POST"): Promise<T> {
  const init: RequestInit = { method, credentials: "include" };
  if (body !== undefined) {
    init.headers = { "content-type": "application/json" };
    init.body = JSON.stringify(body);
  }
  const response = await fetch(`${DATABASE_API}${path}`, init);
  const result = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(result.error ?? `Request failed (${response.status})`);
  return result;
}

export async function getAdminSession(): Promise<AdminUser | null> {
  const result = await adminApi<{ user: AdminUser | null }>("/auth/me", undefined, "GET");
  return result.user;
}

export async function adminLogin(
  username: string,
  password: string,
  remember: boolean,
): Promise<AdminUser> {
  const result = await adminApi<{ user: AdminUser }>("/auth/login", {
    username,
    password,
    remember,
  });
  return result.user;
}

export async function registerAdmin(username: string, password: string) {
  return adminApi<{ message: string }>("/auth/register", { username, password });
}

export function adminLogout() {
  return adminApi("/auth/logout");
}

export async function changeAdminPassword(current: string, next: string): Promise<boolean> {
  await adminApi("/auth/change-password", { currentPassword: current, password: next });
  return true;
}

export async function changeAdminUsername(
  currentPassword: string,
  nextUsername: string,
): Promise<boolean> {
  await adminApi("/auth/change-username", { currentPassword, username: nextUsername });
  return true;
}

export function AdminLogin({ onSuccess }: { onSuccess: (user: AdminUser) => void }) {
  const [mode, setMode] = useState<"login" | "register" | "forgot" | "reset">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("resetToken");
    if (token) {
      setResetToken(token);
      setMode("reset");
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete("resetToken");
      window.history.replaceState(window.history.state, "", cleanUrl);
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      if (mode === "forgot") {
        const result = await adminApi<{ message: string }>("/auth/forgot-password");
        setNotice(result.message);
      } else if (mode === "reset") {
        if (password.length < 8) throw new Error("Password must be at least 8 characters.");
        if (password !== confirmPassword) throw new Error("Passwords do not match.");
        const result = await adminApi<{ message: string }>("/auth/reset-password", {
          token: resetToken,
          password,
        });
        setNotice(result.message);
        setMode("login");
        setPassword("");
        setConfirmPassword("");
        setResetToken("");
      } else if (mode === "register") {
        if (password.length < 8) throw new Error("Password must be at least 8 characters.");
        if (password !== confirmPassword) throw new Error("Passwords do not match.");
        const result = await registerAdmin(username, password);
        setNotice(result.message);
        setMode("login");
        setPassword("");
        setConfirmPassword("");
      } else {
        onSuccess(await adminLogin(username, password, remember));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-login-page relative min-h-screen overflow-hidden bg-[#eef6ff] font-sans text-[#0b2f5e]">
      <div className="relative mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ───────── Left: hero ───────── */}
        <section className="relative isolate flex min-h-[340px] flex-col overflow-hidden text-white lg:min-h-screen">
          <img
            src={building}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b lg:from-[#0a5cc2]/50 lg:via-[#0a5cc2]/30 to-transparent" />

          {/* Brand */}
          <div className="flex items-center gap-4 px-6 pt-6 sm:px-10 lg:px-14 lg:pt-10">
            <GraduationCap
              className="h-12 w-12 shrink-0 sm:h-14 sm:w-14"
              fill="currentColor"
              strokeWidth={1.4}
            />
            <div>
              <p className="text-2xl font-semibold tracking-tight sm:text-4xl">{SCHOOL_NAME}</p>
              <p className="text-sm italic tracking-wide text-blue-50 sm:text-lg">
                Learn <span className="px-2">•</span> Grow <span className="px-2">•</span> Excel
              </p>
            </div>
          </div>

          {/* Welcome band */}
          <div className="flex flex-1 items-center">
            <div className="w-full lg:bg-white/10 px-6 py-5 text-center backdrop-blur-[1.5px] lg:backdrop-blur-[2px] sm:px-10 lg:px-16 lg:py-6 ">
              <h2 className="text-4xl lg:mr-21 font-bold tracking-tight drop-shadow sm:text-5xl lg:text-6xl">
                Welcome Back!
              </h2>
              <p className="mt-3 text-lg font-medium leading-snug sm:text-2xl lg:ml-24 lg:max-w-md lg:text-center">
                Manage Your School
                <br />
                with Ease and Efficiency
              </p>
            </div>
          </div>

          {/* Feature strip */}
          <div className="grid grid-cols-3 bg-[#0a3a78]/60 px-4 py-4 sm:px-10 lg:px-14 lg:py-5">
            <div className="flex flex-col items-center gap-1 border-r border-white/70 px-2">
              <BookOpenText className="h-7 w-7 sm:h-9 sm:w-9" strokeWidth={1.8} />
              <span className="text-center text-xs font-medium leading-tight sm:text-base">
                Quality
                <br />
                Education
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 border-r border-white/70 px-2">
              <Users className="h-7 w-7 sm:h-9 sm:w-9" fill="currentColor" strokeWidth={1.4} />
              <span className="text-center text-xs font-medium leading-tight sm:text-base">
                Bright
                <br />
                Future
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 px-2">
              <Trophy className="h-7 w-7 sm:h-9 sm:w-9" fill="currentColor" strokeWidth={1.4} />
              <span className="text-center text-xs font-medium leading-tight sm:text-base">
                Better
                <br />
                Tomorrow
              </span>
            </div>
          </div>

          {/* Curved edge into the right panel (desktop only) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-y-0 -right-px hidden h-full w-28 lg:block"
          >
            <path
              d="M100 0 L22 0 C62 24 84 42 80 58 C76 78 54 90 40 100 L100 100 Z"
              fill="#9ccbf7"
              fillOpacity="0.7"
            />
            <path
              d="M100 0 L34 0 C72 22 94 42 90 58 C86 76 70 92 58 100 L100 100 Z"
              fill="#eef6ff"
            />
          </svg>
        </section>

        {/* ───────── Right: login / registration card ───────── */}
        <section className="relative flex items-center justify-center px-4 py-8 sm:px-8 lg:px-10">
          <form
            onSubmit={submit}
            className="admin-login-card relative w-full max-w-[460px] overflow-hidden rounded-3xl bg-white px-6 pb-16 pt-6 shadow-[0_20px_55px_rgba(16,71,130,0.18)] sm:px-8"
          >
            <div className="relative z-10">
              <img
                src={logo}
                alt={`${SCHOOL_NAME} logo`}
                className="mx-auto h-28 w-28 rounded-full object-contain sm:h-32 sm:w-32"
              />
              <h1 className="mt-2 text-center text-3xl font-extrabold tracking-tight text-[#0a3f82] sm:text-4xl">
                {mode === "login"
                  ? "Admin Login"
                  : mode === "register"
                    ? "Admin Registration"
                    : mode === "forgot"
                      ? "Forgot Password"
                      : "Reset Password"}
              </h1>

              <div className="mt-3 flex items-center gap-3 text-[#0a3f82]">
                <span className="h-px flex-1 bg-[#a9cbf3]" />
                <GraduationCap className="icon-motion h-6 w-6" fill="currentColor" />
                <span className="h-px flex-1 bg-[#a9cbf3]" />
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#dcebff] px-3 py-3 text-sm font-semibold text-[#0f4686] sm:text-base">
                <ShieldCheck className="h-6 w-6 shrink-0" fill="#0f4686" stroke="white" />
                Authorized Personnel Only
              </div>

              {(mode === "login" || mode === "register") && (
                <label className="mt-5 flex h-12 items-center gap-3 rounded-lg border border-[#cbd5e1] bg-white px-3 shadow-sm transition focus-within:border-[#3c83d5] focus-within:ring-2 focus-within:ring-[#b9d8ff]">
                  <UserRound className="h-5 w-5 shrink-0 fill-[#0a3f82] text-[#1a56a5]" />
                  <span className="sr-only">Admin username</span>
                  <input
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Admin Username"
                    className="ml-1 h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-slate-500"
                  />
                </label>
              )}

              {(mode === "login" || mode === "register" || mode === "reset") && (
                <label className="mt-3 flex h-12 items-center gap-3 rounded-lg border border-[#cbd5e1] bg-white px-3 shadow-sm transition focus-within:border-[#3c83d5] focus-within:ring-2 focus-within:ring-[#b9d8ff]">
                  <LockKeyhole className="h-5 w-5 shrink-0 fill-[#0a3f82] text-[#0a3f82]" />
                  <span className="sr-only">{mode === "login" ? "Password" : "New password"}</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    required
                    minLength={mode === "login" ? undefined : 8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === "login" ? "Password" : "New Password (8+ characters)"}
                    className="ml-1 h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-[#0a3f82]"
                  >
                    {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                </label>
              )}

              {(mode === "register" || mode === "reset") && (
                <>
                  <label className="mt-3 flex h-12 items-center gap-3 rounded-lg border border-[#cbd5e1] bg-white px-3 shadow-sm">
                    <LockKeyhole className="h-5 w-5 shrink-0 text-[#0a3f82]" />
                    <span className="sr-only">Confirm password</span>
                    <input
                      type="password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={
                        mode === "register" ? "Confirm Password" : "Confirm New Password"
                      }
                      className="ml-1 h-full min-w-0 flex-1 bg-transparent text-base outline-none"
                    />
                  </label>
                  {mode === "register" && (
                    <p className="admin-login-copy mt-2 text-sm text-[#0f4686]">
                      Your registration will be sent to the Super Admin for approval. You can sign
                      in after it is approved.
                    </p>
                  )}
                </>
              )}

              {mode === "forgot" && (
                <p className="admin-login-copy mt-5 text-sm text-[#0f4686]">
                  A password reset link will be sent only to the configured Super Admin email
                  address.
                </p>
              )}

              {mode === "login" && (
                <label className="mt-3 flex w-fit cursor-pointer items-center gap-3 text-base font-medium text-[#0b2f5e]">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-400 accent-[#0a3f82]"
                  />
                  Remember session
                </label>
              )}

              {notice && (
                <p
                  role="status"
                  className="admin-login-notice mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700"
                >
                  {notice}
                </p>
              )}
              {error && (
                <p
                  role="alert"
                  className="admin-login-error mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={
                  busy ||
                  ((mode === "login" || mode === "register") && (!username || !password)) ||
                  ((mode === "register" || mode === "reset") &&
                    (!password || !confirmPassword || (!resetToken && mode === "reset")))
                }
                className="mt-4 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#0a3f82] px-4 text-base font-semibold text-white shadow-md transition hover:bg-[#083368] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {mode === "login" ? (
                  <LogIn className="h-5 w-5" />
                ) : mode === "forgot" ? (
                  <Mail className="h-5 w-5" />
                ) : (
                  <UserRound className="h-5 w-5" />
                )}
                {busy
                  ? "Please wait…"
                  : mode === "login"
                    ? "Access Dashboard"
                    : mode === "register"
                      ? "Request Registration"
                      : mode === "forgot"
                        ? "Send Reset Link"
                        : "Save New Password"}
              </button>

              {mode === "login" && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot");
                      setError("");
                      setNotice("");
                    }}
                    className="admin-login-copy mt-3 w-full text-center text-sm font-semibold text-[#0a3f82] underline"
                  >
                    Forgot password?
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setError("");
                      setNotice("");
                    }}
                    className="admin-login-copy mt-3 w-full text-center text-sm font-semibold text-[#0a3f82] underline"
                  >
                    Register for an admin account
                  </button>
                </>
              )}
              {mode !== "login" && (
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError("");
                    setNotice("");
                  }}
                  className="admin-login-copy mt-3 w-full text-center text-sm font-semibold text-[#0a3f82] underline"
                >
                  Back to admin login
                </button>
              )}

              <div className="my-3 flex items-center gap-3 text-sm font-medium text-[#0a3f82]">
                <span className="h-px flex-1 bg-slate-300" />
                or
                <span className="h-px flex-1 bg-slate-300" />
              </div>

              <Link
                to="/"
                className="admin-login-back flex min-h-12 flex-wrap items-center justify-center gap-x-2 rounded-lg border border-[#0a3f82] px-3 py-2 text-center text-[#0a3f82] transition hover:bg-blue-50"
              >
                <ArrowLeft className="icon-motion h-5 w-5 shrink-0" />
                <span className="text-sm font-semibold sm:text-base">Back to Main Website</span>
              </Link>
            </div>

            {/* Bottom wave */}
            <svg
              aria-hidden="true"
              viewBox="0 0 460 60"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full"
            >
              <path
                d="M0 22 C110 52 250 52 460 4 L460 60 L0 60 Z"
                fill="#8cc0f5"
                fillOpacity="0.8"
              />
              <path
                d="M0 18 C100 34 230 36 330 22 C390 14 430 8 460 10 L460 60 L0 60 Z"
                fill="#0a3f82"
              />
            </svg>
          </form>
        </section>
      </div>
    </div>
  );
}
