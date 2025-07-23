import { Component } from '@angular/core';
import { CategoriesComponent } from '../../shared/components/categories/categories.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CategoriesComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
