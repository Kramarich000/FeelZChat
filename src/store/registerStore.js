import { create } from "zustand";

const useRegisterStore = create((set) => ({
  step: 1,
  registrationData: {},
  setStep: (newStep) => set({ step: newStep }),
  setRegistrationData: (data) =>
    set((state) => ({
      registrationData: { ...state.registrationData, ...data },
    })),
  resetForm: () => set({ step: 1, registrationData: {} }),
}));

export default useRegisterStore;
