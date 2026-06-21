from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Annotated
from backend.schemas.auth import Token
from backend.schemas.user import UserLogin, UserCreate, UserRead
from backend.db.database import get_db
from backend.models.user import User  # asegúrate de importar tu modelo

router = APIRouter(prefix="/auth", tags=["auth"])

DBSession = Annotated[Session, Depends(get_db)]

@router.post("/login", response_model=Token, responses={
    400: {"description": "Credenciales inválidas"}
})
def login(user: UserLogin, db: DBSession):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or db_user.hashed_password != user.password:
        raise HTTPException(status_code=400, detail="Credenciales inválidas")

    return {
        "access_token": "fake-token",
        "token_type": "bearer"
    }

@router.post("/register", response_model=UserRead)
def register(user: UserCreate, db: DBSession):
    # lógica de registro
    return {
        "id": 1,
        "email": user.email,
        "is_active": True,
        "created_at": "2026-06-21"
    }
