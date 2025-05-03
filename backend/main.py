from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou especifique ['http://localhost:5500']
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ValidarRequest(BaseModel):
    nome: str
    memoria: str
    eventos: str
    link: str

class RecomendarRequest(BaseModel):
    jogadores: str
    jogos: str
    eventos: str
    produtos: str

@app.post("/validar_social")
async def validar_social(req: ValidarRequest):
    return {
        "resposta": f"{req.nome}, seu perfil está incrível! A memória '{req.memoria}' mostra seu amor pela FURIA. Seguiremos você no {req.link}!"
    }

@app.post("/recomendar")
async def recomendar(req: RecomendarRequest):
    return {
        "recomendacoes": f"""
🔥 Assista o próximo jogo de {req.jogadores or 'nosso time'}.
🛒 Confira nossa nova linha de produtos!
🎮 Participe do torneio de {req.jogos or 'CS2'}.
🎟️ Eventos futuros baseados em '{req.eventos}'.
📱 Compre novamente: {req.produtos}.
""".strip()
    }