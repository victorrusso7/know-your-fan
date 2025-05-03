from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field

class SocialValidation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    link: str
    memoria: str
    eventos: str
    resposta: str
    criado_em: datetime = Field(default_factory=datetime.utcnow)