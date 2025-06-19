import React, { useState } from "react";
import axios from "axios";
import image from "./assets/logo.svg";

function App() {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/upload-pdf",
        formData
      );
      setFileId(res.data.file_id);
      alert("Upload successful!");
    } catch {
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async () => {
    if (!fileId || !question)
      return alert("Please upload a PDF and type a question.");
    const formData = new FormData();
    formData.append("file_id", fileId);
    formData.append("question", question);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/ask-question",
        formData
      );
      setAnswer(res.data.answer);
    } catch {
      alert("Failed to fetch answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white shadow px-6 py-4">
        <div className="flex items-center space-x-3">
          <img src={image} alt="Logo" className="h-10 w-32" />
          {/* <span className="text-xl font-semibold">AI Planet</span> */}
        </div>
        <div>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="border border-gray-300 rounded p-2 text-sm"
          />
          <button
            onClick={handleUpload}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Uploading..." : "Upload PDF"}
          </button>
        </div>
      </nav>

      {/* Answer Section */}
      <main className="flex-grow flex items-center justify-center p-6">
        {answer ? (
          <div className="bg-white border border-gray-300 rounded shadow p-6 w-full max-w-3xl">
            <strong className="text-gray-700">Answer:</strong>
            <p className="mt-2 whitespace-pre-line">{answer}</p>
          </div>
        ) : (
          <p className="text-gray-500 italic">
            Answer will appear here after you ask a question.
          </p>
        )}
      </main>

      {/* Footer - Ask Question */}
      <footer className="border-t bg-white px-6 py-4">
        <div className="flex items-center gap-4 max-w-3xl mx-auto">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="flex-grow border border-gray-300 p-2 rounded text-sm"
          />
          <button
            onClick={handleAsk}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Asking..." : "Send"}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
