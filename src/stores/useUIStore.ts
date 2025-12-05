import { create } from 'zustand';
import { DRAWER_VIEWS } from '@/services/ui.types';
import Cookies from 'js-cookie';

interface UIState {
    isAuthorized: boolean;
    displaySidebar: boolean;
    displayFilter: boolean;
    displaySearch: boolean;
    displayMobileSearch: boolean;
    displayDrawer: boolean;
    drawerView: DRAWER_VIEWS | null;
    data: any;
    authorize: () => void;
    unauthorize: () => void;
    openSidebar: () => void;
    closeSidebar: () => void;
    openFilter: () => void;
    closeFilter: () => void;
    openSearch: () => void;
    closeSearch: () => void;
    toggleSearch: () => void;
    openMobileSearch: () => void;
    closeMobileSearch: () => void;
    toggleMobileSearch: () => void;
    openDrawer: (data?: any) => void;
    closeDrawer: () => void;
    setDrawerView: (view: DRAWER_VIEWS) => void;
}

export const useUIStore = create<UIState>((set, get) => {
    // Sync isAuthorized with cookie
    const authToken = Cookies.get('auth_token');
    
    return {
        isAuthorized: !!authToken,
        displaySidebar: false,
        displayFilter: false,
        displaySearch: false,
        displayMobileSearch: false,
        displayDrawer: false,
        drawerView: null,
        data: null,
        
        authorize: () => set({ isAuthorized: true }),
        unauthorize: () => set({ isAuthorized: false }),

        openSidebar: () => set({ displaySidebar: true }),
        closeSidebar: () => set({ displaySidebar: false, drawerView: null }),

        openFilter: () => set({ displayFilter: true }),
        closeFilter: () => set({ displayFilter: false }),

        openSearch: () => set({ displaySearch: true }),
        closeSearch: () => set({ displaySearch: false }),
        toggleSearch: () => {
            const { displaySearch } = get();
            set({ displaySearch: !displaySearch });
        },

        openMobileSearch: () => set({ displayMobileSearch: true }),
        closeMobileSearch: () => set({ displayMobileSearch: false }),
        toggleMobileSearch: () => {
            const { displayMobileSearch } = get();
            set({ displayMobileSearch: !displayMobileSearch });
        },

        openDrawer: (data) => set({ displayDrawer: true, displaySidebar: false, data }),
        closeDrawer: () => set({ displayDrawer: false }),
        setDrawerView: (view) => set({ drawerView: view }),
    };
});
