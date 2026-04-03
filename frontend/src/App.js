import { useState } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h1>AI Ticket Triage</h1>
      <TicketForm onSuccess={() => setRefresh(prev => prev + 1)} />
      <TicketList refresh={refresh} />
    </div>
  );
}

export default App;
