from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "GigShield AI"
    VERSION: str = "1.0.0"
    
    # Database
    # Using SQLite for the MVP initial launch to avoid Postgres setup blockers, but structured for easy Postgres swapping 
    DATABASE_URL: str = "sqlite:///./gigshield.db"

    # API Keys (Mocked for MVP)
    OPENWEATHER_API_KEY: str = "mock_key"
    AQI_API_KEY: str = "mock_key"

    class Config:
        env_file = ".env"

settings = Settings()
