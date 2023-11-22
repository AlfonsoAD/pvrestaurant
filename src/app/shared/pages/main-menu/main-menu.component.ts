import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarMenuComponent } from '../../components/navbar-menu/navbar-menu.component';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [CommonModule, NavbarMenuComponent],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {}
