import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuCategory, SubCategory, NavbarMegaMenuComponent } from '../navbar-mega-menu/navbar-mega-menu.component';

export interface MenuItem {
  label: string;
  link: string;
  isExternal?: boolean;
}

@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarMegaMenuComponent],
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent {
  @Input() menuItemsBefore: MenuItem[] = [];
  @Input() menuItemsAfter: MenuItem[] = [];
  @Input() showMegaMenu: boolean = true;
  @Input() megaMenuTitle: string = 'DESCUBRIR';
  @Input() viewAllText: string = 'Ver todos los productos';
  @Input() categories: MenuCategory[] = [];

  @Output() categoryClick = new EventEmitter<MenuCategory>();
  @Output() subCategoryClick = new EventEmitter<SubCategory>();
  @Output() viewAllClick = new EventEmitter<void>();

  onCategoryClick(category: MenuCategory): void {
    this.categoryClick.emit(category);
  }

  onSubCategoryClick(subCategory: SubCategory): void {
    this.subCategoryClick.emit(subCategory);
  }

  onViewAllClick(): void {
    this.viewAllClick.emit();
  }
}
