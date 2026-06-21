from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    role: str = "usuario"

class UserCreate(UserBase):
    password: str
    
class UserLogin(BaseModel):
    email: str
    password: str

class UserRead(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        orm_mode = True
