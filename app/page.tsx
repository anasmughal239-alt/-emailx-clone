import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Narrative } from "./components/Narrative";
import { Features } from "./components/Features";
import { Outcomes } from "./components/Outcomes";
import { Work } from "./components/Work";
import { Automation } from "./components/Automation";
import { Workspace } from "./components/Workspace";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Narrative />
      <Features />
      <Outcomes />
      <Work />
      <Automation />
      <Workspace />
      <Footer />
    </main>
  );
}
