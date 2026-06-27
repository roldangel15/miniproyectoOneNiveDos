import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductPage from './pages/ProductPage';
import NotFound from "./pages/NotFound";

function App() {
  const [search, setSearch] = useState("");
  return (
    <CartProvider>
      <Router>
      <div className="min-h-screen flex flex-col font-body-md text-body-md">

      <Header/>
       <Routes>
        <Route path="/" element={<Home search={search} />} />
         <Route path="/products/:id" element={<ProductPage />} />
        
        <Route path="*" element={<NotFound />} />
        {/* Puedes añadir más rutas aquí */}
      </Routes>
      </div>
     </Router>
    </CartProvider>
  );
}

export default App;