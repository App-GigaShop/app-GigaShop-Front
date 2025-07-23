import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/service/darkMode/ThemeService';
import { CommonModule } from '@angular/common';
import { NavbardHomeComponent } from './shared/components/nav/navbard-home/navbard-home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,NavbardHomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sale-electronics'; // Título de la aplicación
  isDarkMode: boolean = false; // Estado del modo oscuro

  constructor(
    private themeService: ThemeService, // Inyectar el servicio de tema
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Suscribirse al observable isDarkMode$ de ThemeService para recibir el estado del tema
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark; // Actualizar el estado local de isDarkMode
      this.cdr.detectChanges(); // Forzar la detección de cambios después de la actualización del tema
    });
  }

  // Método para alternar el tema
  toggleTheme(): void {
    this.themeService.toggleTheme(); // Alternar el tema usando el servicio
  }
}
