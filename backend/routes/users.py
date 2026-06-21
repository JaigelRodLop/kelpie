from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from backend.schemas.user import UserRead
from backend.db.database import get_db

router = APIRouter(prefix="/users", tags=["users"])

DBSession = Annotated[Session, Depends(get_db)]

@router.get("/", response_model=list[UserRead])
def list_users(db: DBSession):
    # lógica para listar usuarios
    return []
