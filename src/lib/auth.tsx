import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type User = { name: string; email: string };
export type AuthView = "signin" | "signup" | null;

type AuthState = {
  user: User | null;
  view: AuthView;
  open: (v: "signin" | "signup") => void;
  close: () => void;
  signIn: (u: User) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthState | null>(null);
const STORAGE_KEY = "explorer-agents-user";

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as User;
    if (parsed && typeof parsed.email === "string") return parsed;
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [view, setView] = useState<AuthView>(null);

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      const savedUser = loadUser();
      if (savedUser) {
        if (!cancelled) {
          setUser(savedUser);
          setHydrated(true);
        }
        return;
      }

      const token = localStorage.getItem("findmytour_token") || sessionStorage.getItem("findmytour_token");
      if (!token) {
        if (!cancelled) {
          setHydrated(true);
        }
        return;
      }

      try {
        const { getSessionUser } = await import("../api/auth");
        const sessionUser = await getSessionUser();
        if (!cancelled && sessionUser) {
          const normalized = {
            name: typeof sessionUser.name === "string" ? sessionUser.name : "Traveler",
            email: typeof sessionUser.email === "string" ? sessionUser.email : "",
          };
          setUser(normalized);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        }
      } catch {
        // Fall back to signed-out UX if the token is expired or invalid.
      } finally {
        if (!cancelled) {
          setHydrated(true);
        }
      }
    };

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  const open = useCallback((v: "signin" | "signup") => setView(v), []);
  const close = useCallback(() => setView(null), []);

  const signIn = useCallback((u: User) => {
    setUser(u);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {
      /* storage unavailable — session stays in memory */
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    // Revoke the Cognito session server-side (best-effort, fire-and-forget).
    void import("../api/auth").then((m) => m.logoutUser());
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("findmytour_token");
      localStorage.removeItem("findmytour_refresh_token");
      sessionStorage.removeItem("findmytour_token");
      // Expire every cookie readable on this origin.
      document.cookie.split(";").forEach((c) => {
        const name = c.split("=")[0]?.trim();
        if (name) {
          document.cookie = `${name}=; Max-Age=0; Path=/`;
        }
      });
    } catch {
      /* noop */
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: hydrated ? user : null, view, open, close, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || "traveler";
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "EA";
  return parts
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}
