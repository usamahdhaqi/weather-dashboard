import { useState } from "react";

export default function SearchBar({ onSearch, onUseLocation }) {
  const [q, setQ] = useState("");
  return (
    <div className="searchbar">
      <input
        placeholder="Search city (e.g. London)"
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        onKeyDown={(e)=> e.key === "Enter" && onSearch(q)}
        className="input"
      />
      <button className="btn" onClick={()=>onSearch(q)}>Search</button>
      <button className="btn ghost" onClick={onUseLocation}>Use my location</button>
    </div>
  );
}
