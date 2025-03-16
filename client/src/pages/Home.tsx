import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyMe } from "@/components/sections/WhyMe";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { VerticalNavigation } from "@/components/layout/VerticalNavigation";

export default function Home() {
  return (
    <>
      <VerticalNavigation />
      <Hero />
      <About />
      <WhyMe />
      <Services />
      <Projects />
      <Process />
      <Contact />
    </>
  );
}
