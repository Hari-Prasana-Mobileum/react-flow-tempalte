import { BrowserRouter, Routes, Route } from "react-router-dom";
import Draw from "./Draw";
import Home from "./Home";
import Internal from "./internal";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/draw" element={<Draw />} />
          <Route path="/internal" element={<Internal />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
