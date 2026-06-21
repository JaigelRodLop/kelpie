from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Crear la aplicación FastAPI
app = FastAPI(title="Kelpie API")

# Configuración de CORS
origins = [
    "https://kelpie-frontend.onrender.com",  # dominio del frontend en Render
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],            # métodos permitidos (GET, POST, etc.)
    allow_headers=["*"],            # headers permitidos
)

# Importar routers
from backend.routes import auth_router, users_router, tickets_router, comments_router

# Incluir routers
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(tickets_router)
app.include_router(comments_router)

@app.get("/")
def root():
    return {"message": "Kelpie API funcionando 🚀"}
