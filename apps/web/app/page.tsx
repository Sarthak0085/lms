import { Header } from "@/components/header";
import { Footer } from "../components/footer";
import { Reviews } from "@/components/home/reviews";
import { Hero } from "@/components/home/hero";

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <Reviews />
      <Footer />
    </main>
  );
}
