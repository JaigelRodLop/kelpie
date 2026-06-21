from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from backend.schemas.auth import Token
from backend.schemas.user import UserCreate, UserRead
from backend.db.database import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

DBSession = Annotated[Session, Depends(get_db)]

@router.post("/login", response_model=Token)
def login(user: UserCreate, db: DBSession):
    # lógica de autenticación
    return {"access_token": "fake-token", "token_type": "bearer"}

@router.post("/register", response_model=UserRead)
def register(user: UserCreate, db: DBSession):
    # lógica de registro
    return {"id": 1, "email": user.email, "is_active": True, "created_at": "2026-06-21"}
