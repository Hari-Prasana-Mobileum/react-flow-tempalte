import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
      <div>
        
      <Link to="/">Home</Link>
      <br />
      <Link to="/draw">Draw</Link>
      <br />
      <Link to="/internal">Internal Communication</Link>
    </div>
  );
}
