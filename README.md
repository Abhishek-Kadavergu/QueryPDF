# 📄 QueryPDF - PDF-based Question Answering System

QueryPDF is a full-stack AI-powered application that enables users to upload PDF documents and ask questions based on the document content. Using state-of-the-art NLP tools like **LangChain**, **LlamaIndex**, and the **Ollama** model, the system intelligently understands the content and provides relevant answers.

---

## 🚀 Features

- Upload PDF documents via a web interface
- Ask questions related to the document
- Get instant, AI-generated answers using LangChain + LlamaIndex + Ollama
- Simple and clean UI built with React + Tailwind CSS
- Backend powered by FastAPI
- Files stored locally

---

## 🛠️ Tech Stack

| Layer      | Tech Used                         |
|------------|-----------------------------------|
| Frontend   | React.js, Tailwind CSS            |
| Backend    | FastAPI                           |
| NLP Engine | LangChain + LlamaIndex + Ollama   |
| PDF Parsing| PyMuPDF                           |
| Storage    | Local File System                 |

---

## 🔧 Prerequisites

Before running the backend, ensure the following are installed on your system:

- **Python 3.8+**
- **Node.js & npm**
- **Ollama**

---

## ⚙️ Setting Up Ollama

1. **Download & Install Ollama**  
   Visit: [https://ollama.com](https://ollama.com)  
   and install Ollama for your operating system.

2. **Run Ollama Locally**  
   Open your terminal and run the model (replace `llama3` with your preferred model):
   ```bash
   ollama run llama3
