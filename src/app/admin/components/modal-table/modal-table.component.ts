import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { TableService } from '../../services/table.service';
import { Table } from '../../../interfaces/table.interface';

@Component({
  selector: 'app-modal-table',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './modal-table.component.html',
  styleUrl: './modal-table.component.scss',
})
export class ModalTableComponent {
  form = this.formBuilder.group({
    number: ['', [Validators.required]],
    capacity: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  isEdit: boolean = false;
  table!: Table;
  tableStatus: string[] = ['Available', 'Busy', 'Out of service'];
  convertStatus: { [key: string]: string } = {
    Available: 'available',
    Busy: 'busy',
    'Out of service': 'outService',
  };
  reverseConvertStatus: { [key: string]: string } = {
    available: 'Available',
    busy: 'Busy',
    outService: 'Out of service',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private formBuilder: FormBuilder,
    private tableService: TableService,
    private dialogRef: MatDialogRef<ModalTableComponent>
  ) {
    if (data?.isEdit) {
      this.isEdit = true;
      this.table = data.table;
      console.log(this.table);

      this.form.patchValue({
        number: this.table.number.toString(),
        capacity: this.table.capacity.toString(),
        status: data.table.table_status,
      });
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill all the required fields.',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      this.form.markAllAsTouched();
      return;
    }

    const body = {
      number: this.form.get('number')?.value,
      capacity: this.form.get('capacity')?.value,
      table_status: [this.convertStatus[this.form.controls.status.value!]],
    };

    if (this.isEdit) {
      const data = {
        ...body,
        id: this.table.id,
      };
      this.editTable(data);
      return;
    }

    this.createTable(body);
  }

  createTable(body: any) {
    this.tableService.postTable(body).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire({
            title: 'Success',
            text: 'Table created successfully.',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.dialogRef.close({ ok: true });
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
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      },
    });
  }

  editTable(body: any) {
    this.tableService.putTable(body).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire({
            title: 'Success',
            text: 'Table edited successfully.',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.dialogRef.close({ ok: true });
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
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      },
    });
  }
}
