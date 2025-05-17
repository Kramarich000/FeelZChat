import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { loadAnalytics } from "@services/loadAnalytics";

const readBoolean = (key, defaultValue) => {
  const raw = localStorage.getItem(key);
  return raw === null ? defaultValue : JSON.parse(raw);
};

const cookieAccepted = readBoolean("cookieAccepted", null);

export const useCookieStore = create(
  devtools((set, get) => ({
    consent: cookieAccepted,
    hasConfirmed: cookieAccepted !== null,
    analyticsEnabled: readBoolean("analyticsEnabled", false),
    isModalOpen: false,

    setConsent: (consent) => {
      localStorage.setItem("cookieAccepted", JSON.stringify(consent));
      set({ consent, hasConfirmed: true });

      if (!consent) {
        localStorage.setItem("analyticsEnabled", JSON.stringify(false));
        set({ analyticsEnabled: false });
      } else {
        if (get().analyticsEnabled) {
          loadAnalytics();
        }
      }
    },

    toggleAnalytics: (enabled) => {
      localStorage.setItem("analyticsEnabled", JSON.stringify(enabled));
      set({ analyticsEnabled: enabled });

      if (get().consent === true && enabled) {
        loadAnalytics();
      }
    },

    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
  })),
);
