from fastapi import FastAPI
from backend.db.database import init_db
from backend.routes import auth_router, users_router, tickets_router, comments_router

app = FastAPI(title="Kelpie API")

# Inicializar BD al arrancar
@app.on_event("startup")
def on_startup():
    init_db()

# Incluir routers
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(tickets_router)
app.include_router(comments_router)
