import { Header } from "@/components/layout/header";
import { Footer } from "../components/footer";
import { Reviews } from "@/components/home/reviews";
import { Hero } from "@/components/home/hero";
import { Courses } from "@/components/home/courses";
import { FAQSection } from "@/components/faq/faq";

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <Courses />
      <Reviews />
      <FAQSection />
      <Footer />
    </main>
  );
}
