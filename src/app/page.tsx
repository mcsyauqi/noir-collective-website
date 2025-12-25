import Hero from '@/components/home/Hero';
import Products from '@/components/home/Products';
import About from '@/components/home/About';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <main>
      <Hero />
      <Products />
      <About />
      <Newsletter />
    </main>
  );
}
