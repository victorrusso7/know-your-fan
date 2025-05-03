from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session, create_engine, select
from validador_social import analisar_perfil, gerar_recomendacoes
from models import SocialValidation
from pydantic import BaseModel
from PIL import Image
import pytesseract
import io

# 🚀 Inicialização do app FastAPI
app = FastAPI()

# 🔧 Caminho do executável do Tesseract (ajustado para ambientes Linux/Render)
pytesseract.pytesseract.tesseract_cmd = "/usr/bin/tesseract"

# 🌐 Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou substitua por ["https://know-your-fan-eta.vercel.app"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 💾 Configuração do banco de dados SQLite
DATABASE_URL = "sqlite:///./validations.db"
engine = create_engine(DATABASE_URL, echo=True)
SQLModel.metadata.create_all(engine)

# 📦 Modelo para o POST /validar_social
class PerfilSocial(BaseModel):
    nome: str
    link: str
    memoria: str
    eventos: str

@app.post("/validar_social")
def validar_social(perfil: PerfilSocial):
    texto = analisar_perfil(perfil.link, perfil.nome, perfil.memoria, perfil.eventos)

    with Session(engine) as session:
        record = SocialValidation(
            nome=perfil.nome,
            link=perfil.link,
            memoria=perfil.memoria,
            eventos=perfil.eventos,
            resposta=texto
        )
        session.add(record)
        session.commit()
        session.refresh(record)

    return {"resposta": texto, "id": record.id}

# 🔍 GET /validacoes
@app.get("/validacoes")
def listar_validacoes():
    with Session(engine) as session:
        results = session.exec(select(SocialValidation).order_by(SocialValidation.criado_em.desc()))
        return results.all()

# 💡 Modelo para POST /recomendar
class Preferencias(BaseModel):
    jogos: str
    jogadores: str
    eventos: str
    produtos: str

@app.post("/recomendar")
def recomendar(preferencias: Preferencias):
    resposta = gerar_recomendacoes(
        preferencias.jogos,
        preferencias.jogadores,
        preferencias.eventos,
        preferencias.produtos
    )
    return {"recomendacoes": resposta}

# 📄 OCR via Upload de Imagem
@app.post("/ocr")
async def ocr_document(document: UploadFile = File(...)):
    try:
        content = await document.read()
        image = Image.open(io.BytesIO(content)).convert('RGB')  # força RGB para evitar erros
        texto_extraido = pytesseract.image_to_string(image, lang='por')  # usa OCR em português
        return {"texto": texto_extraido}
    except Exception as e:
        return {"erro": f"Falha ao processar OCR: {str(e)}"}