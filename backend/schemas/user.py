from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    email: str
    role: str = "usuario"

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        orm_mode = True
