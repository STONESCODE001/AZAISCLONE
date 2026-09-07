'use client';

import { useState } from "react";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { PipelineSection } from "@/components/landing/pipeline-section";
import { ArchiveSection } from "@/components/landing/archive-section";
import { BottomCTA } from "@/components/landing/bottom-cta";
import { Footer } from "@/components/landing/footer";
import { AuthModal } from "@/components/modals/AuthModal";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenAuth = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <Header onOpenAuth={handleOpenAuth} />
      <main className="w-full pt-20 bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          <Hero onOpenAuth={handleOpenAuth} />
          <PipelineSection />
          <ArchiveSection />
          <BottomCTA onOpenAuth={handleOpenAuth} />
        </div>
      </main>
      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}

