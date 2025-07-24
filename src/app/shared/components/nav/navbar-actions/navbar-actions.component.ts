// navbar-actions.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-4">
      <!-- Botón de tema -->
      <button
        (click)="themeToggle.emit()"
        class="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
        [attr.aria-label]="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
        <svg *ngIf="isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.071-7.071l-1.414 1.414M6.343 17.657l-1.414 1.414M17.657 17.657l1.414 1.414M6.343 6.343L4.929 4.929M12 6a6 6 0 100 12 6 6 0 000-12z"></path>
        </svg>
        <svg *ngIf="!isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 1021 12.79z"></path>
        </svg>
      </button>

      <!-- Usuario -->
      <button
        (click)="userClick.emit()"
        class="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
        aria-label="Perfil de usuario">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      </button>

      <!-- Carrito -->
      <button
        (click)="cartClick.emit()"
        class="relative p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
        aria-label="Carrito de compras">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-2L4 3H2m5 10v6a1 1 0 001 1h10a1 1 0 001-1v-6"></path>
        </svg>
        <span
          *ngIf="cartItemsCount > 0"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
          {{ cartItemsCount > 99 ? '99+' : cartItemsCount }}
        </span>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
    }
  `]
})
export class NavbarActionsComponent {
  @Input() isDarkMode: boolean = false;
  @Input() cartItemsCount: number = 0;

  @Output() themeToggle = new EventEmitter<void>();
  @Output() userClick = new EventEmitter<void>();
  @Output() cartClick = new EventEmitter<void>();
}
