import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarSearchComponent } from '../navbar-search/navbar-search.component';
import { MenuItem } from '../navbar-menu/navbar-menu.component';
import { MenuCategory } from '../navbar-mega-menu/navbar-mega-menu.component';

@Component({
  selector: 'app-navbar-mobile',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarSearchComponent],
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss']
})
export class NavbarMobileComponent {
  @Input() isMenuOpen: boolean = false;
  @Input() isMobileDropdownOpen: boolean = false;
  @Input() isDarkMode: boolean = false;
  @Input() cartItemsCount: number = 0;
  @Input() searchPlaceholder: string = 'Buscar.....';
  @Input() menuItemsBefore: MenuItem[] = [];
  @Input() menuItemsAfter: MenuItem[] = [];
  @Input() showMegaMenu: boolean = true;
  @Input() megaMenuTitle: string = 'DESCUBRIR';
  @Input() categories: MenuCategory[] = [];

  @Output() menuToggle = new EventEmitter<void>();
  @Output() mobileDropdownToggle = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();
  @Output() userClick = new EventEmitter<void>();
  @Output() cartClick = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();

  toggleMenu(): void {
    this.menuToggle.emit();
  }

  toggleMobileDropdown(): void {
    this.mobileDropdownToggle.emit();
  }

  closeMenu(): void {
    if (this.isMenuOpen) {
      this.menuToggle.emit();
    }
  }

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

  trackByCategory(index: number, category: MenuCategory): string {
    return category.id;
  }
}
