from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.database import Base, engine
from routes.tickets import router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Ticket Triage")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)