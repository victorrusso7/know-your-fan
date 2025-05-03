import google.generativeai as genai
import os
from dotenv import load_dotenv

# Carrega chave da API do arquivo .env
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Modelo escolhido
modelo = genai.GenerativeModel("gemini-1.5-pro")


def analisar_perfil(link, nome, memoria, eventos):
    prompt = f"""
    Você é um especialista da equipe de engajamento da FURIA Esports, responsável por identificar fãs autênticos.

    Sua missão é analisar o perfil abaixo com base nos critérios de autenticidade, afinidade emocional com a organização, e histórico de interações.

    Dados do torcedor:
    - Nome: {nome}
    - Link/Arroba: {link}
    - Memória marcante com a FURIA: {memoria}
    - Eventos citados: {eventos}

    Etapas da análise:
    1. Avalie se a memória mencionada tem conexão real com a FURIA (ex: partidas, momentos marcantes, jogadores, eventos).
    2. Veja se há menção a algum evento específico ou histórico concreto de participação.
    3. Interprete o tom da fala: demonstra paixão? Identificação com a marca?
    4. Faça uma conclusão curta e objetiva dizendo se esse perfil é ou não um torcedor verdadeiramente engajado.
    5. Seja humano, direto, mas com o estilo FURIA de falar (ousado e informal, sem exagerar).

    Exemplo positivo:
    "{nome}, deu pra sentir sua paixão pela FURIA quando falou de [detalhe]. Esse tipo de lembrança mostra que você veste a camisa de verdade. Vamos te acompanhar no {link}!"

    Exemplo neutro/negativo:
    "{nome}, ainda não vimos uma conexão forte com a FURIA nas suas respostas. Mas todo torcedor começa de algum lugar! Quem sabe você vive algo épico com a gente em breve? 👊"

    Gere a resposta final agora:
    """

    response = modelo.generate_content(prompt)
    return response.text.strip()


def gerar_recomendacoes(jogos, jogadores, eventos, produtos):
    prompt = f"""
    Você é o FuriaBOT, o assistente oficial da torcida da FURIA. Sua missão é criar recomendações personalizadas para fãs com base nas preferências deles.

    Informações do fã:
    - Jogos preferidos: {jogos}
    - Jogadores favoritos: {jogadores}
    - Eventos que participou: {eventos}
    - Produtos comprados: {produtos}

    Gere 3 sugestões com esse estilo:
    1. Um evento que esse fã pode gostar de assistir ou comparecer (presencial ou online).
    2. Um produto oficial da FURIA que tenha a ver com ele (com base em estilo, perfil ou experiências passadas).
    3. Um conteúdo digital que aproxime mais esse fã da comunidade (vídeo, live, dica de canal, etc).

    Use linguagem informal, emojis e estilo empolgado — como se fosse um torcedor animado mandando uma mensagem pelo WhatsApp. Mas não exagere nos exageros ou gírias confusas.

    Retorne em formato de lista:
    1. ...
    2. ...
    3. ...
    """

    response = modelo.generate_content(prompt)
    return response.text.strip()