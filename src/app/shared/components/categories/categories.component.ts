import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  isDarkMode = false;
  isMenuOpen = false;

  categories = [
    { name: 'Accesorios', icon: '/public/compu.png', selected: false },
    { name: 'Audio', icon: '/public/compu.png', selected: false },
    { name: 'Adaptadores y Cables', icon: '/public/compu.png', selected: false },
    { name: 'Almacenamiento', icon: '/public/compu.png', selected: false },
    { name: 'Componentes para PC', icon: '/public/compu.png', selected: false },
    { name: 'Laptop', icon: '/public/compu.png', selected: false },
    { name: 'Computadoras', icon: '/public/compu.png', selected: false }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  toggleSelection(category: any) {
    // Cambiar el estado de la categoría seleccionada
    category.selected = !category.selected;
  }
}
