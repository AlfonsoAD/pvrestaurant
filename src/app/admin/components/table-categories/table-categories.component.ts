import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../interfaces/categories.interface';
import { ModalCategorieComponent } from '../modal-categorie/modal-categorie.component';
import { DocumentsService } from '../../../shared/services/documents.service';
import { convertStringToPDF } from '../../../utils/functions';

@Component({
  selector: 'app-table-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './table-categories.component.html',
  styleUrl: './table-categories.component.scss',
})
export class TableCategoriesComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'is_active',
    'created_at',
    'actions',
  ];
  categories: Category[] = [];
  dataSource = new MatTableDataSource<Category>(this.categories);
  @ViewChild('paginator') paginator: MatPaginator | any;

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private documentService: DocumentsService
  ) {}

  ngOnInit() {
    this.syncData();
  }

  syncData(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response: any) => {
        if (response.ok) {
          this.categories = response.results;
          this.dataSource.data = this.categories;
          this.dataSource.paginator = this.paginator;
        }
      },
    });
  }

  onOpenModal(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const modalCategory = this.dialog.open(ModalCategorieComponent, {
      width: '300px',
    });
    modalCategory.afterClosed().subscribe((result) => {
      if (result?.ok) this.syncData();
    });
  }

  onEdit(event: Event, category: Category) {
    event.preventDefault();
    event.stopPropagation();

    const modalCategory = this.dialog.open(ModalCategorieComponent, {
      width: '300px',
      data: { isEdit: true, category },
    });
    modalCategory.afterClosed().subscribe((result) => {
      if (result?.ok) this.syncData();
    });
  }

  onDelete(event: Event, category: Category) {
    event.preventDefault();
    event.stopPropagation();
    Swal.fire({
      title: `Are you sure you want to delete this category ${category?.name}?`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: '#0702a6',
      cancelButtonColor: '#de3131',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCategory(category.id);
      }
    });
  }

  deleteCategory(idCategory: number) {
    this.categoriesService.deleteCategory(idCategory).subscribe({
      next: (response: any) => {
        if (response.ok) {
          Swal.fire({
            text: response.results,
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          this.syncData();
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text:
            error.error.error ||
            error.error.data_error ||
            'An error has occurred',
          icon: 'error',
          showConfirmButton: false,
          showCancelButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  generateCSV(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    Swal.fire({
      title: 'Generating PDF',
      text: 'Please wait...',
      icon: 'info',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2500,
      timerProgressBar: true,
    });

    this.documentService.getCSVCategories().subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          const csvBase64 = resp.results;
          const csvData = atob(csvBase64);
          const blob = new Blob([csvData], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'categories.csv';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: 'An error has occurred',
          icon: 'error',
          showConfirmButton: false,
          showCancelButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      },
    });
  }

  generatePDF(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    Swal.fire({
      title: 'Generating PDF',
      text: 'Please wait...',
      icon: 'info',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2500,
      timerProgressBar: true,
    });

    this.documentService.getPDFCategories().subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          const dataurl = `data:application/pdf;base64,${resp.results}`;
          const pdf = convertStringToPDF(dataurl);
          const url = window.URL.createObjectURL(pdf);
          window.open(url, '_blank');
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: 'An error has occurred',
          icon: 'error',
          showConfirmButton: false,
          showCancelButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      },
    });
  }
}
