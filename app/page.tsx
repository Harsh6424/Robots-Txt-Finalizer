"use client";

import { useState } from "react";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file || !apiKey) {
      alert("Please enter your OpenAI API Key and upload a file.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("apiKey", apiKey);

    const res = await fetch("/api/process", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    setDownloadUrl(url);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-10 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">URL Parameter Audit Tool</h1>

      <label className="mb-2">Enter OpenAI API Key:</label>
      <input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="sk-..."
        className="mb-4 border px-3 py-2 w-full rounded"
      />

      <input
        type="file"
        accept=".csv,.xlsx,.txt"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!file || !apiKey || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Upload & Generate Audit"}
      </button>

      {downloadUrl && (
        <a
          href={downloadUrl}
          download="url_parameter_audit.xlsx"
          className="mt-6 text-green-600 underline"
        >
          Download Report
        </a>
      )}
    </div>
  );
}
