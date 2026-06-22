from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Annotated
from backend.schemas.ticket import TicketCreate, TicketRead, TicketUpdate
from backend.schemas.comment import CommentCreate, CommentRead
from backend.db.database import get_db
from backend.models.ticket import Ticket, User, Comment
from backend.dependencies import get_current_user

router = APIRouter(prefix="/tickets", tags=["tickets"])

@router.get("/", response_model=list[TicketRead])
def list_tickets(db: Annotated[Session, Depends(get_db)]):
    return db.query(Ticket).all()

@router.post("/", response_model=TicketRead)
def create_ticket(ticket: TicketCreate, db: Annotated[Session, Depends(get_db)]):
    new_ticket = Ticket(
        title=ticket.title,
        description=ticket.description,
        status="open"
    )
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket

@router.get("/asignados", response_model=list[TicketRead])
def get_assigned_tickets(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    return db.query(Ticket).filter(Ticket.assigned_to == current_user.id).all()

@router.put("/{ticket_id}", response_model=TicketRead)
def update_ticket(
    ticket_id: int,
    update_data: TicketUpdate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    if ticket.assigned_to != current_user.id:
        raise HTTPException(status_code=403, detail="No autorizado para modificar este ticket")

    ticket.status = update_data.status
    db.commit()
    db.refresh(ticket)
    return ticket

# 🔹 Nuevo endpoint: comentarios de un ticket
@router.get("/{ticket_id}/comments", response_model=list[CommentRead])
def list_comments(
    ticket_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    return db.query(Comment).filter(Comment.ticket_id == ticket_id).all()

@router.post("/{ticket_id}/comments", response_model=CommentRead)
def add_comment(
    ticket_id: int,
    comment: CommentCreate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    new_comment = Comment(
        content=comment.content,
        ticket_id=ticket_id,
        user_id=current_user.id
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment
