import { useState } from "react";
import axios from "axios";

export default function StatsPage() {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/stats/${code}`);
      setStats(res.data);
    } catch (err) {
      setStats({ error: err.response?.data?.error || "Failed" });
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-bold mb-2">URL Stats</h2>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Enter shortcode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchStats}
          className="bg-green-600 text-white px-4 py-2 ml-2 rounded"
        >
          Fetch Stats
        </button>
      </div>

      {stats && (
        <div className="p-2 border rounded">
          {stats.error ? (
            <span className="text-red-500">{stats.error}</span>
          ) : (
            <>
              <p><b>Original:</b> {stats.originalUrl}</p>
              <p><b>Short:</b> {stats.shortUrl}</p>
              <p><b>Expiry:</b> {new Date(stats.expiry).toLocaleString()}</p>
              <p><b>Clicks:</b> {stats.clicks.length}</p>
              <ul className="list-disc pl-5">
                {stats.clicks.map((c, i) => (
                  <li key={i}>
                    {c.timestamp} - {c.source} - {c.location}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
