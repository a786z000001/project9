import { useState } from "react";

function TicketForm({ onSaved }) {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/tickets/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setResult(data);
      setMessage("");
      onSaved?.();
    } catch (e) {
      setError("Could not analyze ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <textarea
        rows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter support ticket..."
        style={{ width: "100%", padding: 12 }}
      />
      <button onClick={submit} disabled={loading || !message.trim()} style={{ marginTop: 12 }}>
        {loading ? "Analyzing..." : "Submit"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 16, border: "1px solid #ddd", padding: 12 }}>
          <p><strong>Category:</strong> {result.category}</p>
          <p><strong>Priority:</strong> {result.priority}</p>
          <p><strong>Urgency:</strong> {String(result.urgency)}</p>
          <p><strong>Confidence:</strong> {result.confidence}</p>
          <p><strong>Keywords:</strong> {result.keywords.join(", ") || "None"}</p>
          <p><strong>Signals:</strong> {result.signals.join(", ") || "None"}</p>
        </div>
      )}
    </div>
  );
}

export default TicketForm;
