import { Header } from "@/components/header";
import { Footer } from "../components/footer";
import { Reviews } from "@/components/home/reviews";
import { Hero } from "@/components/home/hero";
import { Courses } from "@/components/home/courses";

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <Courses />
      <Reviews />
      <Footer />
    </main>
  );
}
