import { useEffect, useState } from "react";

const API_URL =
  "https://muhammad-abdul-rehman-api.vercel.app";

function Admin({ onLogout }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        onLogout();
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/contacts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        onLogout();
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to load contacts."
        );
      }

      setContacts(result.data || []);
    } catch (error) {
      console.error("Fetch contacts error:", error);

      setError(
        error.message || "Unable to load contacts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = getToken();

      if (!token) {
        onLogout();
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/contacts/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        onLogout();
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to update status."
        );
      }

      setContacts((previousContacts) =>
        previousContacts.map((contact) =>
          contact._id === id
            ? {
                ...contact,
                status,
              }
            : contact
        )
      );
    } catch (error) {
      console.error(
        "Update status error:",
        error
      );

      alert(
        error.message ||
          "Unable to update contact status."
      );
    }
  };

  const deleteContact = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        onLogout();
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        onLogout();
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to delete contact."
        );
      }

      setContacts((previousContacts) =>
        previousContacts.filter(
          (contact) => contact._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete contact error:",
        error
      );

      alert(
        error.message ||
          "Unable to delete contact."
      );
    }
  };

  const newMessages = contacts.filter(
    (contact) => contact.status === "new"
  ).length;

  const repliedMessages = contacts.filter(
    (contact) => contact.status === "replied"
  ).length;

  return (
    <div className="admin-page">
      <div className="admin-container">

        <header className="admin-header">
          <div>
            <p className="admin-label">
              ADMIN DASHBOARD
            </p>

            <h1>
              Muhammad Abdul Rehman
            </h1>

            <p className="admin-subtitle">
              Manage your client inquiries.
            </p>
          </div>

          <div className="admin-header-actions">
            <button
              className="admin-refresh"
              onClick={fetchContacts}
            >
              Refresh
            </button>

            <button
              className="admin-refresh"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </header>

        <section className="admin-stats">

          <div className="admin-stat">
            <span>Total Messages</span>
            <strong>{contacts.length}</strong>
          </div>

          <div className="admin-stat">
            <span>New Messages</span>
            <strong>{newMessages}</strong>
          </div>

          <div className="admin-stat">
            <span>Replied</span>
            <strong>{repliedMessages}</strong>
          </div>

        </section>

        <section className="admin-content">

          <div className="admin-content-header">
            <div>
              <h2>
                Client Messages
              </h2>

              <p>
                Recent inquiries from your portfolio.
              </p>
            </div>
          </div>

          {loading && (
            <div className="admin-message">
              Loading messages...
            </div>
          )}

          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            contacts.length === 0 && (
              <div className="admin-message">
                No client messages yet.
              </div>
            )}

          {!loading &&
            !error &&
            contacts.length > 0 && (
              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Budget</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {contacts.map((contact) => (
                      <tr key={contact._id}>

                        <td>
                          <strong>
                            {contact.name}
                          </strong>
                        </td>

                        <td>
                          <a
                            href={`mailto:${contact.email}`}
                            className="admin-email"
                          >
                            {contact.email}
                          </a>
                        </td>

                        <td>
                          {contact.company || "-"}
                        </td>

                        <td>
                          {contact.budget || "-"}
                        </td>

                        <td>
                          <div className="admin-message-text">
                            {contact.message}
                          </div>
                        </td>

                        <td>
                          <select
                            className="status-select"
                            value={contact.status}
                            onChange={(event) =>
                              updateStatus(
                                contact._id,
                                event.target.value
                              )
                            }
                          >
                            <option value="new">
                              New
                            </option>

                            <option value="read">
                              Read
                            </option>

                            <option value="replied">
                              Replied
                            </option>

                            <option value="archived">
                              Archived
                            </option>
                          </select>
                        </td>

                        <td>
                          <button
                            className="delete-button"
                            onClick={() =>
                              deleteContact(
                                contact._id
                              )
                            }
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>
            )}

        </section>

      </div>
    </div>
  );
}

export default Admin;