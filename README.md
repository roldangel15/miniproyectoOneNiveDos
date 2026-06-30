# FakeStore API Catalog

## 📌 Descripción

Catálogo de productos desarrollado con **ReactJS** y **Tailwind CSS**, consumiendo la [Fake Store API](https://fakestoreapi.com) como fuente de datos. La aplicación permite explorar productos por categoría, buscarlos en tiempo real, ordenarlos según distintos criterios, gestionar un carrito de compras y guardar productos favoritos, todo con un diseño responsivo adaptado tanto a escritorio como a dispositivos móviles.

## 🚀 Despliegue

https://miniproyecto-one-nive-dos.vercel.app/

## 📁 Repositorio

https://github.com/roldangel15/miniproyectoOneNiveDos

## 🛠️ Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/roldangel15/miniproyectoOneNiveDos.git
   cd miniproyectoOneNiveDos
   ```

2. Instalar las dependencias:
   ```bash
   pnpm install
   pnpm install tailwindcss @tailwindcss/vite
   pnpm install react-router-dom axios
   ```

3. Levantar el servidor de desarrollo:
   ```bash
   pnpm run dev
   ```

4. Abrir el navegador en la URL indicada por la consola (por defecto `http://localhost:5173`).

5. Para generar la build de producción:
   ```bash
   pnpm run build
   ```

6. Para previsualizar la build de producción localmente:
   ```bash
   pnpm run preview
   ```

## ⚙️ Características

- Listado de productos
- Búsqueda en tiempo real
- Filtro por categorías
- Página de detalle
- Ordenamiento de productos (más recientes, precio, mejor valorados)
- Carrito de compras (agregar, modificar cantidad, eliminar productos)
- Lista de favoritos con persistencia en `localStorage`
- Header fijo con buscador y navegación por categorías
- Diseño responsivo con menú lateral y barra de navegación inferior en mobile

## 👥 Integrantes del Equipo

- Rolando Angel Campuzano Ustarez
