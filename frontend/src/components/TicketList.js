import { useEffect, useState } from "react";

function TicketList({refresh}) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/tickets")
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, [refresh]);

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Previous Tickets</h2>

      {tickets.map((t) => (
        <div key={t.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p><b>{t.message}</b></p>
          <p>{t.category} | {t.priority}</p>
        </div>
      ))}
    </div>
  );
}

export default TicketList;
