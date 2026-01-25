import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreType, FileType } from "../../../types";

type Store = {
  storeSettings: StoreType;
  setStoreSettings: (settings: StoreType) => void;
  updateStoreSettings: (updates: Partial<StoreType>) => void;
  setLogo: (logo: FileType) => void;
  setHeaderLogo: (logo: FileType) => void;
  setFooterLogo: (logo: FileType) => void;
  setStoreType: (type: "e-commerce" | "restaurant") => void;
  setColors: (colors: { primary: string; secondary: string; text: string }) => void;
  setFonts: (fonts: { heading: string; body: string }) => void;
};

const defaultStoreSettings: StoreType = {
  logo: {},
  name: "",
  description: "",
  type: "e-commerce",
  colors: {
    primary: "#4272FF",
    secondary: "#ACBA12",
    text: "#1D293D",
  },
  fonts: {
    heading: "Arial",
    body: "Arial",
  },
  header: {
    logo: {},
    navigationLinks: [],
  },
  footer: {
    logo: {},
    text: "",
    title: "عن المتجر",
    description: "نقدم لكم أفضل المنتجات والخدمات مع ضمان الجودة والرضا",
    contactInfo: {
      email: "info@example.com",
      phone: "+123 456 7890",
      address: "الرياض، المملكة العربية السعودية",
    },
    links: [],
    socialLinks: [],
    showFooter: true, // Footer يظهر افتراضياً
    footerVariant: "1", // نوع Footer الافتراضي
  },
};

export const useStoreSettingsStore = create<Store>()(
  persist(
    (set) => ({
      storeSettings: defaultStoreSettings,
      setStoreSettings: (settings) => set(() => ({ storeSettings: settings })),
      updateStoreSettings: (updates) =>
        set((state) => ({
          storeSettings: { ...state.storeSettings, ...updates },
        })),
      setLogo: (logo) =>
        set((state) => ({
          storeSettings: { ...state.storeSettings, logo },
        })),
      setHeaderLogo: (logo) =>
        set((state) => ({
          storeSettings: {
            ...state.storeSettings,
            header: { ...state.storeSettings.header, logo },
          },
        })),
      setFooterLogo: (logo) =>
        set((state) => ({
          storeSettings: {
            ...state.storeSettings,
            footer: { ...state.storeSettings.footer, logo },
          },
        })),
      setStoreType: (type) =>
        set((state) => ({
          storeSettings: { ...state.storeSettings, type },
        })),
      setColors: (colors) =>
        set((state) => ({
          storeSettings: { ...state.storeSettings, colors },
        })),
      setFonts: (fonts) =>
        set((state) => ({
          storeSettings: { ...state.storeSettings, fonts },
        })),
    }),
    {
      name: "editor-store-settings-storage",
      storage: {
        getItem: (name) => {
          if (typeof window === 'undefined') return null;
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          if (typeof window === 'undefined') return;
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (e) {
            console.error("Local storage is full, failed to save store settings:", e);
          }
        },
        removeItem: (name) => {
          if (typeof window === 'undefined') return;
          localStorage.removeItem(name);
        },
      },
    }
  )
);
