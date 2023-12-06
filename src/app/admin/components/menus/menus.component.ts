import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableMenusComponent } from '../table-menus/table-menus.component';
import { TableDetailsMenuComponent } from '../table-details-menu/table-details-menu.component';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [CommonModule, TableMenusComponent, TableDetailsMenuComponent],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss',
})
export class MenusComponent {}
