import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CollectionsShowcase from '@/components/home/CollectionsShowcase';
import CategoriesGrid from '@/components/home/CategoriesGrid';
import EditorialSection from '@/components/home/EditorialSection';
import Marquee from '@/components/home/Marquee';
import InstagramFeed from '@/components/home/InstagramFeed';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <CollectionsShowcase />
      <CategoriesGrid />
      <EditorialSection />
      <InstagramFeed />
    </>
  );
}
