export interface State {
    isAuthorized: boolean;
    displaySidebar: boolean;
    displayFilter: boolean;
    displaySearch: boolean;
    displayMobileSearch: boolean;
    displayDrawer: boolean;
    drawerView: DRAWER_VIEWS | null;
    data?: unknown;
}

export type DRAWER_VIEWS = 'CART_SIDEBAR' | 'MOBILE_MENU' | 'ORDER_DETAILS'| 'COMPARE_SIDEBAR' | 'PANEL_SIDEBAR';

export type Action =
    | { type: 'SET_AUTHORIZED' }
    | { type: 'SET_UNAUTHORIZED' }
    | { type: 'OPEN_SIDEBAR' }
    | { type: 'CLOSE_SIDEBAR' }
    | { type: 'OPEN_FILTER' }
    | { type: 'CLOSE_FILTER' }
    | { type: 'OPEN_SEARCH' }
    | { type: 'CLOSE_SEARCH' }
    | { type: 'OPEN_MOBILE_SEARCH' }
    | { type: 'CLOSE_MOBILE_SEARCH' }
    | { type: 'OPEN_DRAWER'; data: unknown }
    | { type: 'CLOSE_DRAWER' }
    | { type: 'SET_DRAWER_VIEW'; view: DRAWER_VIEWS };
