import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider }      from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Header       from './components/Header';
import Footer       from './components/Footer';
import FooterMobile from './components/FooterMobil';
import FavoritesDrawer from './components/FavoritesDrawer';
import Home         from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage  from './pages/ProductPage';
import NotFound     from './pages/NotFound';

function App() {
  const [searchText, setSearchText]       = useState('');
  // El drawer de favoritos se puede abrir tanto desde Header (desktop)
  // como desde FooterMobile (mobile). Lo gestionamos aquí arriba.
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <div className="min-h-screen flex flex-col font-body-md text-body-md bg-background">

            {/* Header siempre visible — pasa setter para que Header
                abra su propio drawer en desktop; el mobile usa el de App */}
            <Header
              searchText={searchText}
              onSearchChange={setSearchText}
              onFavoritesOpen={() => setFavoritesOpen(true)}
            />

            {/* Contenido principal */}
            <main className="flex-1">
              <Routes>
                <Route path="/"
                  element={<Home searchText={searchText} />} />
                <Route path="/products/:id"
                  element={<ProductPage />} />
                <Route path="/products/category/:category"
                  element={<CategoryPage searchText={searchText} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer desktop — siempre visible */}
            <Footer />

            {/* Barra de navegación inferior solo en mobile */}
            <FooterMobile onFavoritesOpen={() => setFavoritesOpen(true)} />

            {/* Drawer de favoritos compartido (mobile lo abre desde abajo,
                desktop desde el Header) */}
            <FavoritesDrawer
              open={favoritesOpen}
              onClose={() => setFavoritesOpen(false)}
            />

          </div>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
