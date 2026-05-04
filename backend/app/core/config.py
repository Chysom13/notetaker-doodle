class Settings:
    PROJECT_NAME: str = "Notetaker API"
    SQLALCHEMY_DATABASE_URL: str = "sqlite:///./notes.db"

settings = Settings()
