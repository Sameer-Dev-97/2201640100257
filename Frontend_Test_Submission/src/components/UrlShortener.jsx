import { useState } from "react";
import axios from "axios";

export default function UrlShortener() {
  const [urls, setUrls] = useState([{ longUrl: "", validity: 30, shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (i, field, value) => {
    const newUrls = [...urls];
    newUrls[i][field] = value;
    setUrls(newUrls);
  };

  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: "", validity: 30, shortcode: "" }]);
    }
  };

  const shortenUrls = async () => {
    const responses = [];
    for (const u of urls) {
      if (!u.longUrl.trim()) {
        responses.push({ error: "Long URL is required" });
        continue;
      }

      try {
        // ✅ Use the correct backend route & field names
        const res = await axios.post("http://localhost:5000/api/shorten", {
          longUrl: u.longUrl,
          code: u.shortcode || undefined,
          validityMinutes: u.validity || undefined, // backend will handle if not provided
        });
        responses.push(res.data);
      } catch (err) {
        responses.push({ error: err.response?.data?.error || "Failed" });
      }
    }
    setResults(responses);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">URL Shortener</h2>

      {urls.map((u, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Enter long URL"
            value={u.longUrl}
            onChange={(e) => handleChange(i, "longUrl", e.target.value)}
            className="border p-2 flex-1 rounded"
          />
          <input
            type="number"
            placeholder="Validity (min)"
            value={u.validity}
            onChange={(e) => handleChange(i, "validity", e.target.value)}
            className="border p-2 w-28 rounded"
          />
          <input
            type="text"
            placeholder="Custom code (opt)"
            value={u.shortcode}
            onChange={(e) => handleChange(i, "shortcode", e.target.value)}
            className="border p-2 w-40 rounded"
          />
        </div>
      ))}

      <div className="mb-3">
        <button onClick={addField} className="bg-gray-300 px-3 py-1 rounded mr-2">
          + Add
        </button>
        <button onClick={shortenUrls} className="bg-blue-600 text-white px-4 py-2 rounded">
          Shorten
        </button>
      </div>

      <div>
        <h3 className="font-semibold">Results:</h3>
        {results.map((r, i) => (
          <div key={i} className="p-2 border my-1 rounded">
            {r.error ? (
              <span className="text-red-500">{r.error}</span>
            ) : (
              <a
                href={r.shortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                {r.shortUrl}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
