import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false); // Estado inicial del tema
  isDarkMode$ = this.isDarkModeSubject.asObservable(); // Exponemos un observable para que los componentes se suscriban

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Comprobamos si estamos en un entorno de navegador antes de intentar acceder a localStorage
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        this.setTheme(storedTheme === 'dark');
      } else {
        this.setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    }
  }

  // Establecer el tema y almacenar en localStorage
  setTheme(isDarkMode: boolean): void {
    this.isDarkModeSubject.next(isDarkMode);
    const html = document.documentElement;

    if (isDarkMode) {
      html.classList.add('dark');
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('theme', 'dark');
      }
    } else {
      html.classList.remove('dark');
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('theme', 'light');
      }
    }
  }

  // Alternar el tema
  toggleTheme(): void {
    this.setTheme(!this.isDarkModeSubject.value); 
  }
}
