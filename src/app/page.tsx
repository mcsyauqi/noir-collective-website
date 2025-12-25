import Hero from '@/components/home/Hero';
import BrandStatement from '@/components/home/BrandStatement';
import NewArrivals from '@/components/home/NewArrivals';
import LookbookGrid from '@/components/home/LookbookGrid';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <NewArrivals />
      <LookbookGrid />
      <FeaturedCollection />
      <Newsletter />
    </>
  );
}
