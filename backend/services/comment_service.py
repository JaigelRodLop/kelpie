from sqlalchemy.orm import Session
from backend.models.comment import Comment
from backend.schemas.comment import CommentCreate
from datetime import datetime, timezone

def create_comment(db: Session, comment: CommentCreate, ticket_id: int, author_id: int):
    new_comment = Comment(
        content=comment.content,
        created_at=datetime.now(timezone.utc),
        ticket_id=ticket_id,
        author_id=author_id
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment
