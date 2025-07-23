import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbard-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbard-home.component.html',
  styleUrls: ['./navbard-home.component.scss'],
})
export class NavbardHomeComponent {
  isMenuOpen: boolean = false;


  @Input() isDarkMode!: boolean;
  @Output() themeToggle = new EventEmitter<void>();

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeToggle.emit();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
