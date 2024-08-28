import { Header } from "@/components/header";
import { Footer } from "../components/footer";
import { Reviews } from "@/components/home/reviews";

export default function Page() {
  return (
    <main>
      <Header />
      <Reviews />
      <Footer />
    </main>
  );
}
