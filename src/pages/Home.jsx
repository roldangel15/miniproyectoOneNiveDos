import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      
      <main className="flex-1">
        <Hero />
        
        <ProductGrid />
      </main>
      <Footer />
    </>
  );
}

export default Home;
