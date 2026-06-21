import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.models.base import Base

# Render te da la variable DATABASE_URL en las Environment Variables
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL"
    )

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependencia para FastAPI con Annotated
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Inicializar tablas
def init_db():
    Base.metadata.create_all(bind=engine)