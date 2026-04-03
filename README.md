# AI-Powered Support Ticket Triage

## Overview

This project is a lightweight full-stack application that analyzes support tickets using rule-based “AI-style” logic. It classifies tickets into categories, assigns priorities, detects urgency, and extracts relevant signals — all without relying on external AI APIs.

The system is designed to simulate a real-world support triage workflow where incoming tickets are automatically analyzed and prioritized before reaching human agents.

---

## Features

* Analyze support tickets via REST API (`POST /tickets/analyze`)
* Categorize tickets into:

  * Billing
  * Technical
  * Account
  * Feature Request
  * Other
* Assign priority levels:

  * **P0** – Critical
  * **P1** – High
  * **P2** – Medium
  * **P3** – Low
* Detect urgency signals (e.g., "urgent", "asap", "down")
* Extract keywords and signals from text
* Store all analyzed tickets in a database (SQLite)
* View previously analyzed tickets in a UI table
* Confidence scoring based on keyword matching
* Custom prioritization rule (security & refund handling)

---

## Tech Stack

**Backend**

* FastAPI
* SQLAlchemy
* SQLite

**Frontend**

* React (basic functional UI)

**Other**

* Python (rule-based NLP logic)
* Docker (optional setup)
* Pytest (unit testing)

---

## Project Structure

```
ai-ticket-triage/
│
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── db/
│   ├── config/
│   └── tests/
│
├── frontend/
│   └── src/components/
│
├── docker-compose.yml
├── README.md
```

---

## How It Works

### 1. Ticket Analysis

When a user submits a ticket:

* The message is processed using keyword-based rules
* Category is determined based on keyword frequency
* Urgency is detected via predefined terms
* Priority is assigned based on severity and signals
* Keywords and signals are extracted
* Confidence score is calculated

---

### 2. API Endpoints

#### Analyze Ticket

```
POST /tickets/analyze
```

Request:

```json
{
  "message": "App is down, urgent fix needed"
}
```

Response:

```json
{
  "category": "Technical",
  "priority": "P1",
  "urgency": true,
  "keywords": ["down", "urgent"],
  "signals": ["urgency_detected"],
  "confidence": 0.65
}
```

---

#### Get Tickets

```
GET /tickets
```

Returns a list of previously analyzed tickets (latest first).

---

## Custom Rule (Required Twist)

Two custom rules were added:

### 1. Security Rule (Critical)

If a ticket contains:

* "hacked", "security", "breach", "compromised"

➡ Automatically:

* Priority = **P0**
* Signal = `security_risk`

**Reason:**
Security issues are highly critical and must be escalated immediately.

---

### 2. Refund Rule (High Priority)

If a ticket contains:

* "refund", "chargeback"

➡ Automatically:

* Category = **Billing**
* Priority = **P1**

**Reason:**
Financial issues directly impact user trust and require faster resolution.

---

## Setup Instructions

### Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate   # Windows
pip install -r requirements.txt
python -m uvicorn app:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## Testing

```bash
cd backend
pytest
```

Covers:

* Category classification
* Priority assignment
* Custom rules

---

## Design Decisions

* **Rule-based NLP instead of ML/LLMs**
  Chosen to meet constraints (no external APIs) and ensure deterministic behavior.

* **SQLite database**
  Lightweight and easy to run locally without setup overhead.

* **Separation of concerns**

  * Routes → API layer
  * Services → business logic
  * Models → database schema
  * Config → keyword rules

* **Config-driven rules**
  Makes the system easy to extend without modifying core logic.

---

## Trade-offs

* Keyword-based classification is simple but not highly accurate
* Confidence score is heuristic, not probabilistic
* No advanced NLP (stemming, embeddings, etc.)
* UI is minimal and focused on functionality

---

## Limitations

* Cannot understand context beyond keywords
* May misclassify ambiguous sentences
* No learning capability or feedback loop
* No authentication or user roles

---

## Future Improvements

* Add ML-based classification or embeddings
* Improve confidence scoring using statistical methods
* Add ticket status tracking (open/resolved)
* Implement authentication and user roles
* Enhance UI with filters and sorting
* Deploy with Docker and cloud hosting

---

## Reflection

This project demonstrates how simple heuristic-based logic can effectively simulate AI-like behavior for practical applications such as ticket triage.

The main challenge was balancing simplicity with usefulness. Instead of overengineering with complex NLP, a rule-based approach was chosen to keep the system interpretable, fast, and aligned with constraints.

The addition of custom rules (security and refund) highlights how domain-specific priorities can significantly improve real-world usability.

If given more time, I would focus on improving classification accuracy, adding learning mechanisms, and making the system production-ready with better UI and deployment support.

---

## Demo



---

## Author

Suchet
