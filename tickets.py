import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import desc

from db.database import SessionLocal
from models.ticket import Ticket
from schemas.ticket import TicketAnalyzeRequest, TicketResponse
from services.analyzer import analyze_ticket

router = APIRouter(prefix="/tickets", tags=["tickets"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/analyze", response_model=TicketResponse)
def analyze_ticket_endpoint(payload: TicketAnalyzeRequest, db: Session = Depends(get_db)):
    result = analyze_ticket(payload.message)

    ticket = Ticket(
        message=payload.message,
        category=result["category"],
        priority=result["priority"],
        urgency=result["urgency"],
        confidence=result["confidence"],
        keywords=json.dumps(result["keywords"]),
        signals=json.dumps(result["signals"]),
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    return TicketResponse(
        id=ticket.id,
        message=ticket.message,
        category=ticket.category,
        priority=ticket.priority,
        urgency=ticket.urgency,
        confidence=ticket.confidence,
        keywords=result["keywords"],
        signals=result["signals"],
        created_at=ticket.created_at,
    )

@router.get("", response_model=list[TicketResponse])
def list_tickets(db: Session = Depends(get_db)):
    tickets = db.query(Ticket).order_by(desc(Ticket.created_at)).limit(50).all()
    output = []
    for t in tickets:
        output.append(
            TicketResponse(
                id=t.id,
                message=t.message,
                category=t.category,
                priority=t.priority,
                urgency=t.urgency,
                confidence=t.confidence,
                keywords=json.loads(t.keywords or "[]"),
                signals=json.loads(t.signals or "[]"),
                created_at=t.created_at,
            )
        )
    return output