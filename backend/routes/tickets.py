from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from backend.schemas.ticket import TicketCreate, TicketRead
from backend.db.database import get_db

router = APIRouter(prefix="/tickets", tags=["tickets"])

DBSession = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=list[TicketRead])
def list_tickets(db: DBSession):
    # lógica para listar tickets
    return []

@router.post("/", response_model=TicketRead)
def create_ticket(ticket: TicketCreate, db: DBSession):
    # lógica para crear ticket
    return {"id": 1, "title": ticket.title, "description": ticket.description, "status": "open"}
