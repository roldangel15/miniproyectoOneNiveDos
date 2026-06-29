import React, { createContext, useContext, useReducer, useEffect } from 'react';

const FavoritesContext = createContext();

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const exists = state.items.find(item => item.id === action.payload.id);
      return {
        ...state,
        items: exists
          ? state.items.filter(item => item.id !== action.payload.id)
          : [...state.items, action.payload],
      };
    }
    case 'LOAD_FAVORITES':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { items: [] });

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        dispatch({ type: 'LOAD_FAVORITES', payload: JSON.parse(saved) });
      } catch (e) { /* ignore parse errors */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.items));
  }, [state.items]);

  const toggleFavorite = (product) =>
    dispatch({ type: 'TOGGLE_FAVORITE', payload: product });

  const isFavorite = (id) => state.items.some(item => item.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites: state.items, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};

export default FavoritesContext;
