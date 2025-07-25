import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-logo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-logo.component.html',
  styleUrls: ['./navbar-logo.component.scss']
})
export class NavbarLogoComponent {}
