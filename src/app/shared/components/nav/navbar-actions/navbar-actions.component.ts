import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-actions.component.html',
  styleUrls: ['./navbar-actions.component.scss']
})
export class NavbarActionsComponent {
  @Input() isDarkMode: boolean = false;
  @Input() cartItemsCount: number = 0;

  @Output() themeToggle = new EventEmitter<void>();
  @Output() userClick = new EventEmitter<void>();
  @Output() cartClick = new EventEmitter<void>();
}
