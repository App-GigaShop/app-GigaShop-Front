// navbar-menu.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuCategory, NavbarMegaMenuComponent } from '../navbar-mega-menu/navbar-mega-menu.component';


export interface MenuItem {
  label: string;
  link: string;
  isExternal?: boolean;
}

@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarMegaMenuComponent],
  template: `
    <div class="hidden lg:flex items-center space-x-8">
      <!-- Enlaces regulares antes del mega menú -->
      <a
        *ngFor="let item of menuItemsBefore"
        [routerLink]="item.link"
        [href]="item.isExternal ? item.link : null"
        class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
        {{ item.label }}
      </a>

      <!-- Mega Menú -->
      <app-navbar-mega-menu
        *ngIf="showMegaMenu"
        [menuTitle]="megaMenuTitle"
        [categories]="categories"
        [viewAllText]="viewAllText"
        (categoryClick)="onCategoryClick($event)"
        (viewAllClick)="onViewAllClick()">
      </app-navbar-mega-menu>

      <!-- Enlaces regulares después del mega menú -->
      <a
        *ngFor="let item of menuItemsAfter"
        [routerLink]="item.link"
        [href]="item.isExternal ? item.link : null"
        class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
        {{ item.label }}
      </a>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-grow: 1;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class NavbarMenuComponent {
  @Input() menuItemsBefore: MenuItem[] = [];
  @Input() menuItemsAfter: MenuItem[] = [];
  @Input() showMegaMenu: boolean = true;
  @Input() megaMenuTitle: string = 'DESCUBRIR';
  @Input() viewAllText: string = 'Ver todos los productos';
  @Input() categories: MenuCategory[] = [];

  @Output() categoryClick = new EventEmitter<MenuCategory>();
  @Output() viewAllClick = new EventEmitter<void>();

  onCategoryClick(category: MenuCategory): void {
    this.categoryClick.emit(category);
  }

  onViewAllClick(): void {
    this.viewAllClick.emit();
  }
}
