import React from 'react'

export default function ProductCard({ product }) {
  const { category, title, price, rating, image } = product;

  return (
    <article className="bg-white border border-border-subtle rounded-xl overflow-hidden product-card-hover group p-4 flex flex-col">
      <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-low mb-4">
        <img
          alt={title}
          className="w-full h-full object-contain mix-blend-multiply p-6"
          src={image}
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
          {category}
        </span>
        <h3 className="font-headline-sm text-label-md text-on-surface line-clamp-1">
          {title}
        </h3>
      </div>
      <div className="mt-auto flex items-center justify-between mb-4">
        <p className="text-on-surface font-bold text-headline-sm">
          ${price.toFixed(2)}
        </p>
        <div className="flex items-center text-rating-amber">
          <span
            className="material-symbols-outlined text-[16px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="text-label-sm ml-1 text-on-surface-variant">
            {rating}
          </span>
        </div>
      </div>
      <button className="w-full bg-on-background text-white py-2.5 rounded-lg font-label-md flex items-center justify-center gap-2 hover:bg-on-surface transition-colors">
        <span className="material-symbols-outlined text-lg">shopping_cart</span>
        Add to Cart
      </button>
    </article>
  );
}


