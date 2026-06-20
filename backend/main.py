from fastapi import FastAPI

app = FastAPI(title="Kelpie API")

@app.get("/")
def root():
    return {"message": "Kelpie API funcionando"}