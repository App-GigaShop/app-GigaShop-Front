// navbar-mega-menu.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuCategory {
  id: string;
  name: string;
  description: string[];
  icon: string;
  gradient: string;
  link: string;
}

@Component({
  selector: 'app-navbar-mega-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative group">
      <button class="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
        {{ menuTitle }}
        <svg class="ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <!-- Mega Menu -->
      <div class="absolute left-1/2 transform -translate-x-1/2 top-full mt-3 w-screen max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50">
        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div
              *ngFor="let category of categories; trackBy: trackByCategory"
              class="group/item p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
              (click)="onCategoryClick(category)">
              <div class="flex flex-col items-center text-center">
                <div [ngClass]="'w-16 h-16 bg-gradient-to-br ' + category.gradient + ' rounded-2xl flex items-center justify-center mb-4 group-hover/item:scale-110 transition-transform duration-200'">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath(category.icon)"></path>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 dark:text-white text-base mb-2">{{ category.name }}</h3>
                <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p *ngFor="let desc of category.description">{{ desc }}</p>
                </div>
              </div>

              <!-- Imagen al hover -->
              <div class="mt-4 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                <div class="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ category.name }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Call to action -->
          <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600 text-center">
            <button
              (click)="viewAllClick.emit()"
              class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200">
              {{ viewAllText }}
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NavbarMegaMenuComponent {
  @Input() menuTitle: string = 'DESCUBRIR';
  @Input() viewAllText: string = 'Ver todos los productos';
  @Input() categories: MenuCategory[] = [];

  @Output() categoryClick = new EventEmitter<MenuCategory>();
  @Output() viewAllClick = new EventEmitter<void>();

  onCategoryClick(category: MenuCategory): void {
    this.categoryClick.emit(category);
  }

  trackByCategory(index: number, category: MenuCategory): string {
    return category.id;
  }

  getIconPath(iconType: string): string {
    const iconPaths: { [key: string]: string } = {
      gaming: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      professional: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      compact: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
      external: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
    };

    return iconPaths[iconType] || iconPaths['gaming'];
  }
}
