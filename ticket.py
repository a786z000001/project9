from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from sqlalchemy.sql import func
from db.database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(Text, nullable=False)
    category = Column(String(50), nullable=False)
    priority = Column(String(5), nullable=False)
    urgency = Column(Boolean, nullable=False, default=False)
    confidence = Column(Float, nullable=False)
    keywords = Column(Text, nullable=False, default="[]")
    signals = Column(Text, nullable=False, default="[]")
    created_at = Column(DateTime(timezone=True), server_default=func.now())