import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { PipelineSection } from "@/components/landing/pipeline-section";
import { ArchiveSection } from "@/components/landing/archive-section";
import { BottomCTA } from "@/components/landing/bottom-cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          <Hero />
          <PipelineSection />
          <ArchiveSection />
          <BottomCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
