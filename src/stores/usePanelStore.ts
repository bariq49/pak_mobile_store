// 📁 stores/usePanelStore.ts
import { create } from 'zustand'

export interface PanelState {
    selectedColor: string;
    selectedTab: number;
    selectedLayout?: string;
    selectedFooter?: string;
    selectedDirection: string;
    theme?: string;
    
    setSelectedColor: (color: string) => void;
    setSelectedTab: (tab: number) => void;
    setSelectedLayout: (layout: string) => void;
    setSelectedFooter: (footer: string) => void;
    setSelectedDirection: (dir: string) => void;
    setThemeZustand: (theme: string) => void;
}

export const usePanelStore = create<PanelState>((set) => ({
    selectedColor: 'primary',
    selectedTab: 0,
    selectedLayout: undefined,
    selectedFooter: undefined,
    selectedDirection: 'ltr',
    theme: 'light',
    
    setSelectedColor: (color) => set({ selectedColor: color }),
    setSelectedTab: (tab) => set({ selectedTab: tab }),
    setSelectedLayout: (layout) => set({ selectedLayout: layout }),
    setSelectedFooter: (footer) => set({ selectedFooter: footer }),
    setSelectedDirection: (dir) => set({ selectedDirection: dir }),
    setThemeZustand: (theme) => set({ theme }),
}));
