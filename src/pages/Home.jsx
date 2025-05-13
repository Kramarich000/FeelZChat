import { lazy, Suspense } from "react";
import Header from "@components/Header";
import Loader from "@components/Loader";
import MainHero from "@components/home-components/MainHero";
// import ModalSection from '@components/home-components/ModalSection';

const FeaturesSection = lazy(
  () => import("@components/home-components/FeaturesSection"),
);
const HowItWorksSection = lazy(
  () => import("@components/home-components/HowItWorksSection"),
);
const LinksSection = lazy(
  () => import("@components/home-components/LinksSection"),
);

const Footer = lazy(() => import("@components/Footer"));

export default function Home() {
  return (
    <div className="relative w-full mx-auto">
      <div className="fixed inset-x-0 top-0 bottom-0 min-h-screen -z-10 mobile-bg sm:home-container" />
      <Header />
      <MainHero />

      {/* <ModalSection /> */}

      <Suspense fallback={<Loader />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <HowItWorksSection />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <LinksSection />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </div>
  );
}
