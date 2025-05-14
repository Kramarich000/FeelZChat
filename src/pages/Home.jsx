import { lazy, Suspense } from "react";
import Header from "@components/Header";
import Loader from "@components/Loader";
import MainHero from "@components/home-components/MainHero";
import SecuritySection from "@components/home-components/SecuritySection";
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

const SliderSection = lazy(
  () => import("@components/main-components/MainSlider"),
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
        <SecuritySection />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <HowItWorksSection />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <SliderSection />
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
