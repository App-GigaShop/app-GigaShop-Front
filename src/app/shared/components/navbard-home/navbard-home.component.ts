import { Component, EventEmitter, Input, Output, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface MenuCategory {
  id: string;
  name: string;
  description: string[];
  icon: string;
  color: string;
  image: string;
  link: string;
  gradient: string;
}

@Component({
  selector: 'app-navbard-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbard-home.component.html',
  styleUrls: ['./navbard-home.component.scss'],
})
export class NavbardHomeComponent implements OnInit {
  isMenuOpen: boolean = false;
  isMobileDropdownOpen: boolean = false;
  searchQuery: string = '';
  cartItemsCount: number = 0;

  @Input() isDarkMode!: boolean;
  @Output() themeToggle = new EventEmitter<void>();

  // Categorías para el mega menú con gradientes profesionales
  categories: MenuCategory[] = [
    {
      id: 'gpu-gaming',
      name: 'GPU Gaming',
      description: ['Alta gama', 'NVIDIA RTX', 'AMD Radeon'],
      icon: 'gaming',
      color: 'blue',
      image: 'assets/images/gpu-gaming.jpg',
      link: '/productos/gpu-gaming',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'gpu-profesionales',
      name: 'GPU Profesionales',
      description: ['Edición de video', 'Workstation', 'Renderizado 3D'],
      icon: 'professional',
      color: 'green',
      image: 'assets/images/gpu-professional.jpg',
      link: '/productos/gpu-profesionales',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'gpu-compactas',
      name: 'GPU Compactas',
      description: ['Mini PC', 'Bajo consumo', 'SFF builds'],
      icon: 'compact',
      color: 'purple',
      image: 'assets/images/gpu-compact.jpg',
      link: '/productos/gpu-compactas',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'gpu-externas',
      name: 'GPU Externas',
      description: ['eGPU para laptops', 'Thunderbolt 3/4', 'Plug & Play'],
      icon: 'external',
      color: 'orange',
      image: 'assets/images/gpu-external.jpg',
      link: '/productos/gpu-externas',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Cargar datos del carrito si existe
    this.loadCartCount();
  }

  // Cerrar menús al hacer clic fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative.group') && !target.closest('.lg\\:hidden')) {
      this.isMenuOpen = false;
    }
  }

  // Cerrar menú móvil al redimensionar ventana
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth >= 1024) { // lg breakpoint
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

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Buscando:', this.searchQuery);
      // Navegar a página de resultados de búsqueda
      this.router.navigate(['/buscar'], {
        queryParams: { q: this.searchQuery.trim() }
      });

      // Cerrar menú móvil si está abierto
      this.isMenuOpen = false;

      // Limpiar búsqueda
      this.searchQuery = '';
    }
  }

  onCategoryClick(category: MenuCategory): void {
    console.log('Navegando a:', category.name);
    this.router.navigate([category.link]);

    // Cerrar menú móvil si está abierto
    this.isMenuOpen = false;
    this.isMobileDropdownOpen = false;
  }

  onUserClick(): void {
    console.log('Abriendo perfil de usuario');
    this.router.navigate(['/perfil']);
  }

  onCartClick(): void {
    console.log('Abriendo carrito de compras');
    this.router.navigate(['/carrito']);
  }

  // Método para cargar el conteo del carrito
  private loadCartCount(): void {
    // Aquí implementarías la lógica para obtener el número de items del carrito
    // Ejemplo: desde localStorage, servicio, API, etc.
    const savedCartCount = localStorage.getItem('cartCount');
    this.cartItemsCount = savedCartCount ? parseInt(savedCartCount) : 0;
  }

  // Método para actualizar el conteo del carrito
  updateCartCount(count: number): void {
    this.cartItemsCount = count;
    localStorage.setItem('cartCount', count.toString());
  }

  // Método auxiliar para obtener el SVG path de cada ícono
  getIconPath(iconType: string): string {
    const iconPaths: { [key: string]: string } = {
      gaming: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      professional: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      compact: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
      external: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
    };

    return iconPaths[iconType] || iconPaths['gaming'];
  }

  // Método para manejar errores de carga de imágenes
  onImageError(event: any, category: MenuCategory): void {
    // Fallback a placeholder
    event.target.src = `https://via.placeholder.com/400x240/e5e7eb/6b7280?text=${encodeURIComponent(category.name)}`;
  }

  // Método para track by en ngFor (optimización de rendimiento)
  trackByCategory(index: number, category: MenuCategory): string {
    return category.id;
  }
}
