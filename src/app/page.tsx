import { Hero } from "@/components/sections/hero";
import { Categories } from "@/components/sections/categories";
import { Featured } from "@/components/sections/featured";
import { Promotion } from "@/components/sections/promotion";
import { BestSellers } from "@/components/sections/best-sellers";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { InstagramGallery } from "@/components/sections/instagram";
import { Newsletter } from "@/components/sections/newsletter";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Categories />
      <Featured />
      <Promotion />
      <BestSellers />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </main>
  );
}
