import os
from dotenv import load_dotenv

# Cargar variables desde .env si existe
load_dotenv()

# Configuración de base de datos
DATABASE_URL = os.getenv("DATABASE_URL")

# Configuración de seguridad
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")  # en producción usar variable segura
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
