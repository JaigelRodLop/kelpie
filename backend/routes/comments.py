from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from backend.schemas.comment import CommentCreate, CommentRead
from backend.db.database import get_db

router = APIRouter(prefix="/comments", tags=["comments"])

DBSession = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=list[CommentRead])
def list_comments(db: DBSession):
    # lógica para listar comentarios
    return []

@router.post("/", response_model=CommentRead)
def create_comment(comment: CommentCreate, db: DBSession):
    # lógica para crear comentario
    return {"id": 1, "content": comment.content, "ticket_id": 1, "author_id": 1}
