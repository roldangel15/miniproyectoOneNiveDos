import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider }      from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Header          from './components/Header';
import Footer          from './components/Footer';
import FooterMobile    from './components/FooterMobil';
import FavoritesDrawer from './components/FavoritesDrawer';
import SortSheet       from './components/SortSheet';
import Home         from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage  from './pages/ProductPage';
import NotFound     from './pages/NotFound';

function App() {
  const [searchText, setSearchText]       = useState('');
  const [sortOption, setSortOption]       = useState('Newest');
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [sortSheetOpen, setSortSheetOpen] = useState(false);

  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <div className="min-h-screen flex flex-col font-body-md text-body-md bg-background">

            {/* Header siempre visible */}
            <Header
              searchText={searchText}
              onSearchChange={setSearchText}
              onFavoritesOpen={() => setFavoritesOpen(true)}
            />

            {/* Contenido principal */}
            <main className="flex-1">
              <Routes>
                <Route path="/"
                  element={
                    <Home
                      searchText={searchText}
                      sortOption={sortOption}
                      onSortChange={setSortOption}
                    />
                  } />
                <Route path="/products/:id"
                  element={<ProductPage />} />
                <Route path="/products/category/:category"
                  element={
                    <CategoryPage
                      searchText={searchText}
                      sortOption={sortOption}
                      onSortChange={setSortOption}
                    />
                  } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer desktop — siempre visible */}
            <Footer />

            {/* Barra de navegación inferior solo en mobile.
                El botón "Explore" abre el selector de orden (SortSheet). */}
            <FooterMobile
              onFavoritesOpen={() => setFavoritesOpen(true)}
              onExploreClick={() => setSortSheetOpen(true)}
            />

            {/* Drawer de favoritos compartido */}
            <FavoritesDrawer
              open={favoritesOpen}
              onClose={() => setFavoritesOpen(false)}
            />

            {/* Bottom-sheet de orden, solo mobile */}
            <SortSheet
              open={sortSheetOpen}
              onClose={() => setSortSheetOpen(false)}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />

          </div>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
