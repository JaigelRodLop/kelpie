from sqlalchemy.orm import Session
from backend.models.ticket import Ticket
from backend.schemas.ticket import TicketCreate
from datetime import datetime, timezone

def create_ticket(db: Session, ticket: TicketCreate, owner_id: int):
    new_ticket = Ticket(
        title=ticket.title,
        description=ticket.description,
        status="open",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
        owner_id=owner_id
    )
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket
