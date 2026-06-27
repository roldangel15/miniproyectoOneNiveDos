export default function Hero() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
      {/* Centrado en móvil con justify-center, alineado a la izquierda en escritorio con md:justify-start */}
      <div className="hero-gradient rounded-3xl overflow-hidden min-h-[480px] flex items-center justify-center md:justify-start px-8 md:px-16 text-white relative">
        {/* mx-auto y text-center en móvil; md:mx-0 y md:text-left en escritorio */}
        <div className="max-w-xl space-y-6 relative z-10 text-center mx-auto md:text-left md:mx-0">
          <div className="inline-flex items-center px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full border border-white/20 text-label-sm uppercase tracking-widest text-primary-fixed-dim">
            New Collection 2024
          </div>
          {/* El <br /> original se oculta en móvil (hidden) y se muestra en escritorio (md:block) */}
          <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg leading-tight">
            Redefine Your <br className="hidden md:block" />
            <span className="text-primary-fixed-dim">Everyday Style</span>
          </h1>
          <p className="text-body-lg text-white/80">
            Explore our curated selection of premium electronics and high-fashion
            apparel tailored for the modern lifestyle.
          </p>
          {/* Botones centrados en móvil con justify-center, a la izquierda en escritorio con md:justify-start */}
          <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
            <button className="bg-primary hover:bg-surface-tint text-white px-8 py-3.5 rounded-lg font-label-md transition-all">
              Shop Collection
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3.5 rounded-lg font-label-md transition-all">
              View Deals
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}