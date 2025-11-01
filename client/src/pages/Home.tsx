import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Lighthouse } from "@/components/sections/Lighthouse";
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
      <Lighthouse />
      <WhyMe />
      <Services />
      <Projects />
      <Process />
      <Contact />
    </>
  );
}
