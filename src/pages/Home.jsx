// import { lazy } from 'react';
import Header from "@components/Header";
import Footer from "@components/Footer";
import MainHero from "@components/home-components/MainHero";
import FeaturesSection from "@components/home-components/FeaturesSection";
import HowItWorksSection from "@components/home-components/HowItWorksSection";
import ScrollbarSection from "@components/home-components/ScrollbarSection";
import LinksSection from "@components/home-components/LinksSection";
import ModalSection from "@components/home-components/ModalSection";
// import ComponentLazyLoad from '@components/ComponentLazyLoad';

// const FeaturesSection = lazy(
//   () => import('@components/home-components/FeaturesSection'),
// );
// const HowItWorksSection = lazy(
//   () => import('@components/home-components/HowItWorksSection'),
// );

// const ScrollbarSection = lazy(
//   () => import('@components/home-components/ScrollbarSection'),
// );

// const ModalSection = lazy(
//   () => import('@components/home-components/ModalSection'),
// );

// const LinksSection = lazy(
//   () => import('@components/home-components/LinksSection'),
// );

export default function Home() {
  return (
    <div className="relative w-full mx-auto">
      <div className="fixed inset-x-0 top-0 bottom-0 min-h-screen -z-10 mobile-bg sm:home-container" />

      {/* Header */}
      <Header />

      {/* MainHero  */}
      <MainHero />

      {/* Features */}
      {/* <ComponentLazyLoad> */}
      <FeaturesSection />
      {/* </ComponentLazyLoad> */}

      {/* Как это работает */}
      {/* <ComponentLazyLoad> */}
      <HowItWorksSection />
      {/* </ComponentLazyLoad> */}

      {/* Скроллер */}
      {/* <ComponentLazyLoad> */}
      <ScrollbarSection />
      {/* </ComponentLazyLoad> */}

      {/* Линки */}
      {/* <ComponentLazyLoad> */}
      <LinksSection />
      {/* </ComponentLazyLoad> */}

      {/* Footer */}
      {/* <ComponentLazyLoad> */}
      <Footer />
      {/* </ComponentLazyLoad> */}
      {/* Модалка */}
      <ModalSection />
    </div>
  );
}
