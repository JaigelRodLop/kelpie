from pydantic import BaseModel
from datetime import datetime

class CommentBase(BaseModel):
    content: str

class CommentCreate(BaseModel):
    content: str

class CommentRead(BaseModel):
    id: int
    content: str
    user_id: int
    ticket_id: int

    class Config:
        orm_mode = True

