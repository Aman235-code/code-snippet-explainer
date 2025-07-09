/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ClipboardCopy, Sparkles } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/snippets/add", {
        snippet: code,
      });
      setResult(res.data.result);
    } catch (err) {
      alert("Error generating summary", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        {" "}
        Code Snippet Summerizer
      </h1>
      <br />

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={6}
          className="w-full p-4 border rounded resize-none font-mono bg-white"
          placeholder="Paste your code snippet here..."
        />
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            <Sparkles size={18} />
            {loading ? "Summarizing..." : "Summarize"}
          </motion.button>

          <button
            onClick={copyToClipboard}
            type="button"
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            <ClipboardCopy size={16} />
            Copy Code
          </button>
        </div>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6 border"
        >
          <h2 className="text-xl font-semibold mb-2">Summary ✨</h2>
          <p className="mb-4 text-gray-800 text-justify">{result.summary}</p>

          <SyntaxHighlighter
            style={oneDark}
            customStyle={{
              borderRadius: "0.5rem",
              fontSize: "0.85rem",
              padding: "1rem",
              marginTop: "0.5rem",
              overflowX: "auto", // ✅ Add this
            }}
          >
            {result.snippet}
          </SyntaxHighlighter>
        </motion.div>
      )}
      <p className="text-center text-sm text-gray-500 mt-8">
        Created by: <span className="font-semibold text-gray-700">Aman</span>
      </p>
    </div>
  );
}

export default App;
