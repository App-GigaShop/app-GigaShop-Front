// shared/components/nav/index.ts

export * from './navbard-home/navbard-home.component';
export * from './navbar-logo/navbar-logo.component';
export * from './navbar-search/navbar-search.component';
export * from './navbar-actions/navbar-actions.component';
export * from './navbar-menu/navbar-menu.component';
export * from './navbar-mega-menu/navbar-mega-menu.component';
export * from './navbar-mobile/navbar-mobile.component';

export interface MenuCategory {
  id: string;
  name: string;
  description: string[];
  icon: string;
  gradient: string;
  link: string;
}

export interface MenuItem {
  label: string;
  link: string;
  isExternal?: boolean;
}
