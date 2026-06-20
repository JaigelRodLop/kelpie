from fastapi import FastAPI
from backend.routes import auth, tickets

app = FastAPI(title="Kelpie Helpdesk")

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(tickets.router, prefix="/tickets", tags=["tickets"])