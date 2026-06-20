from backend.config import Base, engine
from backend.models.user import User
from backend.models.ticket import Ticket
from backend.models.comment import Comment

def test_create_tables():
    Base.metadata.create_all(bind=engine)
    tables = Base.metadata.tables.keys()
    print("Tablas creadas:", tables)
    assert "users" in tables
    assert "tickets" in tables
    assert "comments" in tables

if __name__ == "__main__":
    test_create_tables()
