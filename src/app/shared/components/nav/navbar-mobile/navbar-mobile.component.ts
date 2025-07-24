// src/app/shared/components/nav/navbar-mobile/navbar-mobile.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  HostListener
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarSearchComponent } from '../navbar-search/navbar-search.component';
import { MenuItem } from '../navbar-menu/navbar-menu.component';
import { MenuCategory } from '../navbar-mega-menu/navbar-mega-menu.component';

// Enum para tipos de dispositivos
enum DeviceType {
  MOBILE_SMALL = 'mobile-small',    // < 375px
  MOBILE = 'mobile',                // 375px - 640px
  MOBILE_LARGE = 'mobile-large',    // 640px - 768px
  TABLET = 'tablet'                 // 768px - 1024px
}

@Component({
  selector: 'app-navbar-mobile',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarSearchComponent],
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss']
})
export class NavbarMobileComponent implements OnInit, OnDestroy {
  // Inputs básicos
  @Input() isMenuOpen: boolean = false;
  @Input() isMobileDropdownOpen: boolean = false;
  @Input() isDarkMode: boolean = false;
  @Input() cartItemsCount: number = 0;
  @Input() searchPlaceholder: string = 'Buscar productos...';
  @Input() menuItemsBefore: MenuItem[] = [];
  @Input() menuItemsAfter: MenuItem[] = [];
  @Input() showMegaMenu: boolean = true;
  @Input() megaMenuTitle: string = 'CATEGORÍAS';
  @Input() categories: MenuCategory[] = [];

  // Outputs
  @Output() menuToggle = new EventEmitter<void>();
  @Output() mobileDropdownToggle = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();
  @Output() userClick = new EventEmitter<void>();
  @Output() cartClick = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();
  @Output() viewAllCategories = new EventEmitter<void>();

  // Estados del componente
  deviceType: DeviceType = DeviceType.MOBILE;
  screenWidth: number = 0;
  screenHeight: number = 0;
  hasNotch: boolean = false;
  isLandscape: boolean = false;
  shouldShowExtraActions: boolean = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.detectDevice();
      this.detectNotch();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.detectDevice();
    }
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(): void {
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.detectDevice();
        this.detectNotch();
      }
    }, 100);
  }

  // Detección de dispositivo y pantalla
  private detectDevice(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      this.isLandscape = this.screenWidth > this.screenHeight;

      // Determinar tipo de dispositivo
      if (this.screenWidth < 375) {
        this.deviceType = DeviceType.MOBILE_SMALL;
        this.shouldShowExtraActions = false;
      } else if (this.screenWidth < 640) {
        this.deviceType = DeviceType.MOBILE;
        this.shouldShowExtraActions = true;
      } else if (this.screenWidth < 768) {
        this.deviceType = DeviceType.MOBILE_LARGE;
        this.shouldShowExtraActions = true;
      } else {
        this.deviceType = DeviceType.TABLET;
        this.shouldShowExtraActions = true;
      }
    }
  }

  private detectNotch(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Detectar si el dispositivo tiene notch (iOS)
      const safeAreaTop = getComputedStyle(document.documentElement)
        .getPropertyValue('--safe-area-inset-top');
      this.hasNotch = safeAreaTop !== '' && safeAreaTop !== '0px';
    }
  }

  // Métodos de control del menú
  toggleMenu(): void {
    this.menuToggle.emit();
    this.handleBodyScroll();
  }

  toggleMobileDropdown(): void {
    this.mobileDropdownToggle.emit();
  }

  closeMenu(): void {
    if (this.isMenuOpen) {
      this.menuToggle.emit();
      this.handleBodyScroll();
    }
  }

  private handleBodyScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = this.isMenuOpen ? '' : 'hidden';
    }
  }

  // Métodos de eventos
  onThemeToggle(): void {
    this.themeToggle.emit();
  }

  onUserClick(): void {
    this.userClick.emit();
    this.closeMenu();
  }

  onCartClick(): void {
    this.cartClick.emit();
    this.closeMenu();
  }

  onSearch(query: string): void {
    this.search.emit(query);
    this.closeMenu();
  }

  onViewAllCategories(): void {
    this.viewAllCategories.emit();
    this.closeMenu();
  }

  // Getters para clases CSS dinámicas
  getQuickLinksGridClass(): string {
    switch (this.deviceType) {
      case DeviceType.MOBILE_SMALL:
        return 'grid-cols-2'; // 2 columnas en pantallas muy pequeñas
      case DeviceType.MOBILE:
        return this.isLandscape ? 'grid-cols-4' : 'grid-cols-3'; // 3-4 columnas
      case DeviceType.MOBILE_LARGE:
        return this.isLandscape ? 'grid-cols-4' : 'grid-cols-3'; // 3-4 columnas
      case DeviceType.TABLET:
        return 'grid-cols-4'; // 4 columnas en tablets
      default:
        return 'grid-cols-3';
    }
  }

  getCategoriesGridClass(): string {
    switch (this.deviceType) {
      case DeviceType.MOBILE_SMALL:
        return 'grid grid-cols-2'; // 2 columnas para pantallas pequeñas
      case DeviceType.MOBILE:
        return this.isLandscape ? 'grid grid-cols-4' : 'grid grid-cols-2'; // 2-4 columnas
      case DeviceType.MOBILE_LARGE:
        return this.isLandscape ? 'grid grid-cols-4' : 'grid grid-cols-3'; // 3-4 columnas
      case DeviceType.TABLET:
        return 'grid grid-cols-4'; // 4 columnas en tablets
      default:
        return 'grid grid-cols-2';
    }
  }

  getSearchInputClass(): string {
    return this.deviceType === DeviceType.MOBILE_SMALL
      ? 'text-sm py-2'
      : 'text-base py-3';
  }

  // Métodos de tracking para ngFor
  trackByCategory(index: number, category: MenuCategory): string {
    return category.id;
  }

  trackByMenuItem(index: number, item: MenuItem): string {
    return item.link + item.label;
  }

  // Getters para información del dispositivo
  get isMobileSmall(): boolean {
    return this.deviceType === DeviceType.MOBILE_SMALL;
  }

  get isMobile(): boolean {
    return this.deviceType === DeviceType.MOBILE;
  }

  get isMobileLarge(): boolean {
    return this.deviceType === DeviceType.MOBILE_LARGE;
  }

  get isTablet(): boolean {
    return this.deviceType === DeviceType.TABLET;
  }

  get canShowTooltips(): boolean {
    return this.screenWidth >= 640; // Solo mostrar tooltips en pantallas medianas+
  }

  get maxCategoriesPerRow(): number {
    switch (this.deviceType) {
      case DeviceType.MOBILE_SMALL:
        return 2;
      case DeviceType.MOBILE:
        return this.isLandscape ? 4 : 2;
      case DeviceType.MOBILE_LARGE:
        return this.isLandscape ? 4 : 3;
      case DeviceType.TABLET:
        return 4;
      default:
        return 2;
    }
  }

  // Métodos de utilidad
  getDeviceInfo(): string {
    return `${this.deviceType} - ${this.screenWidth}x${this.screenHeight} - ${this.isLandscape ? 'Landscape' : 'Portrait'}`;
  }

  shouldShowDebugInfo(): boolean {
    // Solo mostrar información de debug en desarrollo
    return false; // Cambiar a true para debug
  }

  // Método para optimizar animaciones en dispositivos lentos
  get reducedMotion(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  }

  // Método para obtener clase de padding seguro para dispositivos con notch
  getSafeAreaClass(): string {
    return this.hasNotch ? 'pb-safe' : 'pb-4';
  }
}
