import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carousel } from 'flowbite'; // Asegúrate de importar Flowbite

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    // Asegúrate de que el elemento sea un HTMLElement
    const carouselElement = document.querySelector('#carouselExampleAutoplaying') as HTMLElement;
    if (carouselElement) {
      new Carousel(carouselElement);
    }
  }
}
