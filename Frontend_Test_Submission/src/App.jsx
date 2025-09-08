import UrlShortener from "./components/UrlShortener";
import StatsPage from "./components/StatsPage";



function App() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">React URL Shortener</h1>
      <UrlShortener />
      <StatsPage />
    </div>
  );
}

export default App;
