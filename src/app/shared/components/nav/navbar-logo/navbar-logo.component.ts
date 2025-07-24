// navbar-logo.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-logo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex items-center space-x-3">
      <div class="flex-shrink-0">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-200">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
      </div>
      <a routerLink="/" class="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
        TechStore
      </a>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
    }
  `]
})
export class NavbarLogoComponent {}
