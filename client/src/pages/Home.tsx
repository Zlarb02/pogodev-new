import { lazy, Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { VerticalNavigation } from "@/components/layout/VerticalNavigation";

// Lazy load des sections non-critiques (below-the-fold)
const About = lazy(() => import("@/components/sections/About").then(m => ({ default: m.About })));
const WhyMe = lazy(() => import("@/components/sections/WhyMe").then(m => ({ default: m.WhyMe })));
const Services = lazy(() => import("@/components/sections/Services").then(m => ({ default: m.Services })));
const Projects = lazy(() => import("@/components/sections/Projects").then(m => ({ default: m.Projects })));
const Process = lazy(() => import("@/components/sections/Process").then(m => ({ default: m.Process })));
const Contact = lazy(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })));

// Fallback minimaliste pour le lazy loading
const SectionFallback = () => <div className="min-h-[200px]" />;

export default function Home() {
  return (
    <>
      <VerticalNavigation />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhyMe />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Process />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </>
  );
}
