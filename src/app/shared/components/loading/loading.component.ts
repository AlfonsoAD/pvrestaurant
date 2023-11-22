import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatProgressBarModule,
  ProgressBarMode,
} from '@angular/material/progress-bar';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  mode: ProgressBarMode = 'indeterminate';
  isLoading$ = this.loadingService.isLoading$;

  constructor(private readonly loadingService: LoadingService) {}
}
