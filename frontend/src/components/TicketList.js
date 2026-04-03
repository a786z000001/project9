import { useEffect, useState } from "react";

function TicketList({ refreshKey }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/tickets")
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch(() => setTickets([]));
  }, [refreshKey]);

  return (
    <div>
      <h2>Previously Analyzed Tickets</h2>
      <table width="100%" border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Message</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.id}>
              <td>{t.message}</td>
              <td>{t.category}</td>
              <td>{t.priority}</td>
              <td>{t.confidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketList;
