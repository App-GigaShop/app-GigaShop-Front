import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SubCategory {
  name: string;
  description: string;
  link: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  gradient: string;
  link: string;
  subCategories: SubCategory[];
}

@Component({
  selector: 'app-navbar-mega-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-mega-menu.component.html',
  styleUrls: ['./navbar-mega-menu.component.scss']
})
export class NavbarMegaMenuComponent {
  @Input() menuTitle: string = 'DESCUBRIR';
  @Input() viewAllText: string = 'Ver todos los productos';
  @Input() categories: MenuCategory[] = [];

  @Output() categoryClick = new EventEmitter<MenuCategory>();
  @Output() subCategoryClick = new EventEmitter<SubCategory>();
  @Output() viewAllClick = new EventEmitter<void>();

  selectedCategory: MenuCategory | null = null;

  onCategoryClick(category: MenuCategory): void {
    // Si la categoría tiene subcategorías, la seleccionamos para mostrarlas
    if (category.subCategories.length > 0) {
      this.selectedCategory = this.selectedCategory?.id === category.id ? null : category;
    } else {
      // Si no tiene subcategorías, navegamos directamente
      this.categoryClick.emit(category);
    }
  }

  onSubCategoryClick(subCategory: SubCategory): void {
    this.subCategoryClick.emit(subCategory);
  }

  trackByCategory(index: number, category: MenuCategory): string {
    return category.id;
  }
}
