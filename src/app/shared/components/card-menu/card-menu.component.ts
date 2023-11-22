import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Module } from '../../../interfaces/modules.interface';

@Component({
  selector: 'app-card-menu',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './card-menu.component.html',
  styleUrl: './card-menu.component.scss',
})
export class CardMenuComponent {
  @Input() module!: Module;
}
