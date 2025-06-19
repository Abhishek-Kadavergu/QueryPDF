# main.py
from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from uuid import uuid4
import os

from pdf_utils import extract_text_from_pdf
from nlp_utils import get_answer_from_text

app = FastAPI()

# Allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dictionary to hold extracted PDF text
pdf_text_store = {}

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile):
    file_id = str(uuid4())
    file_ext = os.path.splitext(file.filename)[1]
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}{file_ext}")

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Extract text using utility
    try:
        full_text = extract_text_from_pdf(file_path)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"Failed to extract text: {e}"})

    pdf_text_store[file_id] = full_text

    return {"message": "Uploaded successfully", "file_id": file_id}

@app.post("/ask-question")
async def ask_question(file_id: str = Form(...), question: str = Form(...)):
    if file_id not in pdf_text_store:
        return JSONResponse(status_code=404, content={"error": "File ID not found"})

    try:
        answer = get_answer_from_text(pdf_text_store[file_id], question)
        return {"answer": answer}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
