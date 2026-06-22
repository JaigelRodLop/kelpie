from pydantic import BaseModel
from datetime import datetime

class TicketBase(BaseModel):
    title: str
    description: str | None = None

class TicketCreate(TicketBase):
    pass

class TicketRead(TicketBase):
    id: int
    status: str
    created_at: datetime
    updated_at: datetime
    owner_id: int

    class Config:
        orm_mode = True

class TicketUpdate(BaseModel):
    status: str