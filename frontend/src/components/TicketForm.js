import { useState } from "react";

function TicketForm({onSuccess}) {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  const submit = async () => {
    const res = await fetch("http://localhost:8001/tickets/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResult(data);
    setMessage("");   // clears input after submit
    onSuccess();
  };

  return (
    <div>
      <textarea
        rows={5}
        style={{ width: "100%" }}
        placeholder="Enter ticket..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={submit} style={{ marginTop: 10 }}>
        Submit
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Result</h3>
          <p>Category: {result.category}</p>
          <p>Priority: {result.priority}</p>
          <p>Urgency: {String(result.urgency)}</p>
          <p>Confidence: {result.confidence}</p>
        </div>
      )}
    </div>
  );
}

export default TicketForm;
