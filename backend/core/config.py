from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str
    REDIS_URL: str
    ENVIRONMENT: str = "development"

    class Config:
        env_file = "backend/.env"

settings = Settings()
