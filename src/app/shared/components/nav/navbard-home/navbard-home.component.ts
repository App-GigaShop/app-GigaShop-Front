import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// Importar todos los sub-componentes
import { NavbarLogoComponent } from '../navbar-logo/navbar-logo.component';
import { NavbarSearchComponent } from '../navbar-search/navbar-search.component';
import { NavbarActionsComponent } from '../navbar-actions/navbar-actions.component';
import { NavbarMenuComponent } from '../navbar-menu/navbar-menu.component';
import { NavbarMobileComponent } from '../navbar-mobile/navbar-mobile.component';

// Importar interfaces desde navbar-mega-menu para consistencia
import { MenuCategory, SubCategory } from '../navbar-mega-menu/navbar-mega-menu.component';
import { MenuItem } from '../navbar-menu/navbar-menu.component';

@Component({
  selector: 'app-navbard-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarLogoComponent,
    NavbarSearchComponent,
    NavbarActionsComponent,
    NavbarMenuComponent,
    NavbarMobileComponent,
  ],
  templateUrl: './navbard-home.component.html',
  styleUrls: ['./navbard-home.component.scss'],
})
export class NavbardHomeComponent implements OnInit {
  isMenuOpen: boolean = false;
  isMobileDropdownOpen: boolean = false;
  cartItemsCount: number = 0;

  @Input() isDarkMode!: boolean;
  @Output() themeToggle = new EventEmitter<void>();

  // Elementos del menú antes del mega menú
  menuItemsBefore: MenuItem[] = [
    { label: 'CONTÁCTANOS', link: '/contactanos' },
  ];

  // Elementos del menú después del mega menú
  menuItemsAfter: MenuItem[] = [
    { label: 'SOFTWARE', link: '/software' },
    { label: 'OFERTAS', link: '/ofertas' },
  ];

  // Categorías actualizadas para el mega menú (SIN iconSvg)
  categories: MenuCategory[] = [
    {
      id: 'gaming',
      name: 'Gaming',
      gradient: 'from-blue-500 to-blue-600',
      link: '/productos/gaming',
      subCategories: []
    },
    {
      id: 'cables',
      name: 'Cables',
      gradient: 'from-green-500 to-green-600',
      link: '/productos/cables',
      subCategories: [
        {
          name: 'Cables USB-C',
          description: 'USB-C datos, carga rápida, adaptadores USB-C',
          link: '/productos/cables/usb-c'
        },
        {
          name: 'Cables USB-A',
          description: 'USB-A convencionales, extensiones USB-A',
          link: '/productos/cables/usb-a'
        },
        {
          name: 'Cables HDMI',
          description: 'HDMI alta velocidad, HDMI 4K, mini HDMI',
          link: '/productos/cables/hdmi'
        },
        {
          name: 'Cables DisplayPort',
          description: 'DisplayPort 1.2, DisplayPort 1.4, adaptadores DisplayPort',
          link: '/productos/cables/displayport'
        },
        {
          name: 'Cables Audio',
          description: 'Audio 3.5mm, Audio ópticos',
          link: '/productos/cables/audio'
        },
        {
          name: 'Cables Red/Ethernet',
          description: 'Red/Ethernet Cat5e, Red/Ethernet Cat6, Red/Ethernet Cat7',
          link: '/productos/cables/ethernet'
        },
        {
          name: 'Cables Lightning',
          description: 'Lightning convencionales, Extensiones Lightning',
          link: '/productos/cables/lightning'
        }
      ]
    },
    {
      id: 'laptops',
      name: 'Laptops',
      gradient: 'from-purple-500 to-purple-600',
      link: '/productos/laptops',
      subCategories: []
    },
    {
      id: 'monitores',
      name: 'Monitores',
      gradient: 'from-indigo-500 to-indigo-600',
      link: '/productos/monitores',
      subCategories: []
    },
    {
      id: 'computadoras',
      name: 'Computadoras',
      gradient: 'from-red-500 to-red-600',
      link: '/productos/computadoras',
      subCategories: []
    },
    {
      id: 'audio',
      name: 'Audio',
      gradient: 'from-yellow-500 to-yellow-600',
      link: '/productos/audio',
      subCategories: []
    },
    {
      id: 'impresoras',
      name: 'Impresoras',
      gradient: 'from-teal-500 to-teal-600',
      link: '/productos/impresoras',
      subCategories: []
    },
    {
      id: 'almacenamiento',
      name: 'Almacenamiento',
      gradient: 'from-pink-500 to-pink-600',
      link: '/productos/almacenamiento',
      subCategories: []
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCartCount();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative.group') && !target.closest('.lg\\:hidden')) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth >= 1024) {
      this.isMenuOpen = false;
      this.isMobileDropdownOpen = false;
    }
  }

  toggleTheme(): void {
    this.themeToggle.emit();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.isMobileDropdownOpen = false;
    }
  }

  toggleMobileDropdown(): void {
    this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
  }

  onSearch(query: string): void {
    console.log('Buscando:', query);
    this.router.navigate(['/buscar'], {
      queryParams: { q: query },
    });
    this.closeMenus();
  }

  onCategoryClick(category: MenuCategory): void {
    console.log('Navegando a:', category.name);
    this.router.navigate([category.link]);
    this.closeMenus();
  }

  onSubCategoryClick(subCategory: SubCategory): void {
    console.log('Navegando a subcategoría:', subCategory.name);
    this.router.navigate([subCategory.link]);
    this.closeMenus();
  }

  onViewAllClick(): void {
    console.log('Ver todos los productos');
    this.router.navigate(['/productos']);
    this.closeMenus();
  }

  onUserClick(): void {
    console.log('Abriendo perfil de usuario');
    this.router.navigate(['/perfil']);
    this.closeMenus();
  }

  onCartClick(): void {
    console.log('Abriendo carrito de compras');
    this.router.navigate(['/carrito']);
    this.closeMenus();
  }

  private closeMenus(): void {
    this.isMenuOpen = false;
    this.isMobileDropdownOpen = false;
  }

  private loadCartCount(): void {
    if (typeof localStorage !== 'undefined') {
      const savedCartCount = localStorage.getItem('cartCount');
      this.cartItemsCount = savedCartCount ? parseInt(savedCartCount) : 0;
    }
  }

  updateCartCount(count: number): void {
    this.cartItemsCount = count;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartCount', count.toString());
    }
  }
}
