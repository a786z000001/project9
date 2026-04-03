import { useState } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "Arial" }}>
      <h1>AI Ticket Triage</h1>
      <TicketForm onSaved={() => setRefreshKey((v) => v + 1)} />
      <TicketList refreshKey={refreshKey} />
    </div>
  );
}

export default App;