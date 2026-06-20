from backend.config import Base, engine

def test_create_tables():
    
    Base.metadata.create_all(bind=engine)
    
    tables = Base.metadata.tables.keys()
    assert "users" in tables
    assert "tickets" in tables
    assert "comments" in tables