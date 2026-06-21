from pydantic import BaseModel
from datetime import datetime

class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    pass

class CommentRead(CommentBase):
    id: int
    created_at: datetime
    ticket_id: int
    author_id: int

    class Config:
        orm_mode = True
