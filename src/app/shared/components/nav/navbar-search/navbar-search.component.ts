// src/app/shared/components/nav/navbar-search/navbar-search.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss']
})
export class NavbarSearchComponent {
  @Input() placeholder: string = 'Buscar.....';
  @Input() containerClass: string = '';
  @Input() inputClass: string = 'w-80 rounded-full';
  @Input() showSearchButton: boolean = true;

  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  searchQuery: string = '';
  isFocused: boolean = false;

  performSearch(): void {
    if (this.searchQuery.trim()) {
      this.search.emit(this.searchQuery.trim());
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.clear.emit();
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}
