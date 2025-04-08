// SearchResults.js
import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {/* Insert logic to show results based on `query` */}
    </div>
  );
}