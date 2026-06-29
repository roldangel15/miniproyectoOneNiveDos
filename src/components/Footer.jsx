import { NavLink } from "react-router-dom";

export default function Footer() {
  const categories = [
    { label: "Electronics", path: "/products/category/electronics" },
    { label: "Jewelry", path: "/products/category/jewelery" },
    { label: "Men's", path: "/products/category/men%27s%20clothing" },
    { label: "Women's", path: "/products/category/women%27s%20clothing" },
];
  
  
 
  const support = [
    "Help Center",
    "Shipping Policy",
    "Returns & Refunds",
    "Order Tracking",
  ];
  const legal = ["Terms of Service", "Privacy Policy", "Cookies"];

  return (
    <footer className="hidden bg-white border-t border-border-subtle pt-16 pb-8 px-margin-mobile md:px-margin-desktop md:block">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
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
            <p className="text-on-surface-variant text-label-md max-w-xs">
              Your one-stop destination for premium lifestyle products, from
              jewelry to electronics. Quality guaranteed.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">
                  share
                </span>
              </button>
              <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">
                  alternate_email
                </span>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-label-sm">
              Categories
            </h4>
            <ul className="space-y-4">
              

             {categories.map((category) => (
                     <li key={category.path}>
                          <NavLink
                            
                            to={category.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "whitespace-nowrap font-bold text-blue-600"
                                    : "whitespace-nowrap hover:text-blue-600"
                            }
                        >
                            {category.label}
                        </NavLink>
                        </li>
                    ))}

            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-label-sm">
              Support
            </h4>
            <ul className="space-y-4">
              {support.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-on-surface-variant hover:text-primary transition-colors text-label-md"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-label-sm">
              Newsletter
            </h4>
            <p className="text-on-surface-variant text-label-md mb-4">
              Get the latest updates on new arrivals and sales.
            </p>
            <div className="space-y-3">
              <input
                className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 text-label-md focus:ring-1 focus:ring-primary"
                placeholder="Your email address"
                type="email"
              />
              <button className="w-full bg-primary hover:bg-surface-tint text-white py-3 rounded-lg font-bold transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-label-sm text-on-surface-variant">
            © 2024 Luxe Store. Powered by FakeStore API.
          </p>
          <div className="flex gap-6">
            {legal.map((item) => (
              <a
                key={item}
                href="#"
                className="text-label-sm text-on-surface-variant hover:text-on-surface"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}