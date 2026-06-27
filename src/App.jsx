import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductPage from './pages/ProductPage';

function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="min-h-screen flex flex-col font-body-md text-body-md">
      <Header/>
      <Routes>
        <Route path="/" element={<Home search={search} />} />
         <Route path="/products/:id" element={<ProductPage />} />
        
      
        {/* Puedes añadir más rutas aquí */}
      </Routes>
    </div>
  );
}

export default App;