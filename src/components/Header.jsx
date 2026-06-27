import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const categories = [
    { label: "Electronics", path: "/products/category/electronics" },
    { label: "Jewelry", path: "/products/category/jewelery" },
    { label: "Men's", path: "/products/category/men%27s%20clothing" },
    { label: "Women's", path: "/products/category/women%27s%20clothing" },
];
//const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

function Header () {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border-subtle h-16">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex items-center justify-between">
        {/* Logo + Nav */}
        <div className="flex items-center gap-10">
          <a
            href="#"
            className="text-2xl font-black tracking-tighter text-on-surface"
          >
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-3xl">
                shopping_bag
              </span>
              LUXE.
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
           {categories.map((category) => (
                     
                          <NavLink
                            key={category.path}
                            to={category.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "whitespace-nowrap font-bold text-blue-600"
                                    : "whitespace-nowrap hover:text-blue-600"
                            }
                        >
                            {category.label}
                        </NavLink>
                        
                    ))}
           
          </nav>
        </div>
{/*debemos ver lo del carrito y los likes y el imput */}
        {/* Search + Actions */}
        <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
          <div className="relative w-full max-w-sm hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
              search
            </span>
            <input
              className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-label-md focus:ring-2 focus:ring-primary/20"
              placeholder="Search products..."
              type="text"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full">
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full relative">
              <span className="material-symbols-outlined">shopping_cart</span>
              <span className="absolute top-1 right-1 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                3
              </span>
            </button>
           
            <button className="rounded-full border-2 border-surface-container-high overflow-hidden w-8 h-8"> 
              <img alt="Profile" className="w-full h-full object-cover" 
                src="/img/rolando.png" /> 
            </button>





          </div>
        </div>
      </div>
    </header>
  )
};

export default Header;
