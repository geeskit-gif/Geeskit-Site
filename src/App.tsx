import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { About } from "./components/About";
import { SiteFooter } from "./components/SiteFooter";

export default function App() {
  return (
    <div className="page">
      <div className="page-bg" aria-hidden="true" />
      <SiteHeader />
      <main>
        <Hero />
        <Products />
        <About />
      </main>
      <SiteFooter />
    </div>
  );
}
