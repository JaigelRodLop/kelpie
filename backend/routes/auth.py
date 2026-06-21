from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Annotated
from backend.schemas.user import UserLogin, UserCreate, UserRead, LoginResponse
from backend.db.database import get_db
from backend.models.user import User
from werkzeug.security import generate_password_hash, check_password_hash

router = APIRouter(prefix="/auth", tags=["auth"])

DBSession = Annotated[Session, Depends(get_db)]

# 🔹 LOGIN
@router.post("/login", response_model=LoginResponse, responses={
    400: {"description": "Credenciales inválidas"}
})
def login(user: UserLogin, db: DBSession):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not check_password_hash(db_user.hashed_password, user.password):
        raise HTTPException(status_code=400, detail="Credenciales inválidas")

    return {
        "access_token": "fake-token",   # luego integras JWT real
        "token_type": "bearer",
        "role": db_user.role,
        "first_name": db_user.first_name,
        "last_name": db_user.last_name,
        "email": db_user.email
    }

# 🔹 REGISTER
@router.post("/register", response_model=UserRead)
def register(user: UserCreate, db: DBSession):
    hashed_password = generate_password_hash(user.password)

    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        role=user.role,
        hashed_password=hashed_password,
        is_active=True
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user
