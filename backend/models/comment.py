from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .base import Base

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    ticket_id = Column(Integer, ForeignKey("tickets.id"))
    author_id = Column(Integer, ForeignKey("users.id"))

    ticket = relationship("Ticket", back_populates="comments")
    author = relationship("User", back_populates="comments")
