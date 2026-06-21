from fastapi import FastAPI
from backend.db.database import init_db
from backend.routes import auth_router, users_router, tickets_router, comments_router

app = FastAPI(title="Kelpie API")

# Inicializar BD al arrancar
@app.get("/")
def read_root():
    return {"message": "Kelpie API funcionando 🚀"}

# Incluir routers
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(tickets_router)
app.include_router(comments_router)
