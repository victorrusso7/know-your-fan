from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pytesseract
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou especifique http://localhost:3000 se quiser restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ocr")
async def ocr(document: UploadFile = File(...)):
    contents = await document.read()
    image = Image.open(io.BytesIO(contents))
    texto = pytesseract.image_to_string(image)
    return {"texto": texto}