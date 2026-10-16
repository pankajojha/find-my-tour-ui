import { useAuth } from '../lib/auth';

// Gates a page behind sign-in: signed-out visitors get an inline prompt that
// opens the auth modal instead of the page content.
export default function RequireAuth({ title, children }) {
  const { user, open } = useAuth();

  if (user) return children;

  return (
    <section className="page">
      <div className="card" style={{ maxWidth: 460, margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ marginTop: 0 }}>{title || 'Sign in to continue'}</h1>
        <p className="muted">
          Trip planning is available once you&apos;re aboard. Sign in or create a free
          account — two trip plans included.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.25rem' }}>
          <button type="button" className="button" onClick={() => open('signin')}>
            Sign in
          </button>
          <button type="button" className="ghost-button" onClick={() => open('signup')}>
            Create account
          </button>
        </div>
      </div>
    </section>
  );
}
