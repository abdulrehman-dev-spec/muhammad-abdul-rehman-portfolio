import { useState } from "react";

const API_URL = "https://muhammad-abdul-rehman-api.vercel.app";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Login failed."
        );
      }

      localStorage.setItem(
        "adminToken",
        result.token
      );

      onLogin(result.token);

    } catch (error) {
      console.error(
        "Admin login error:",
        error
      );

      setError(
        error.message ||
          "Unable to login."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-icon">
          🔐
        </div>

        <p className="admin-label">
          PRIVATE AREA
        </p>

        <h1>
          Admin Login
        </h1>

        <p className="admin-login-description">
          Sign in to manage your client inquiries.
        </p>

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >

          <label htmlFor="admin-email">
            Email
          </label>

          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Admin email"
            autoComplete="email"
            required
          />

          <label htmlFor="admin-password">
            Password
          </label>

          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Admin password"
            autoComplete="current-password"
            required
          />

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

        <a
          href="/"
          className="admin-back-link"
        >
          ← Back to portfolio
        </a>

      </div>

    </main>
  );
}

export default AdminLogin;