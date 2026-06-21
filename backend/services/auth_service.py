from sqlalchemy.orm import Session
from backend.models.user import User
from backend.schemas.user import UserCreate
from datetime import datetime, timezone

def register_user(db: Session, user: UserCreate):
    new_user = User(
        email=user.email,
        hashed_password=user.password,  # en producción: usar hash
        is_active=True,
        created_at=datetime.now(timezone.utc)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
