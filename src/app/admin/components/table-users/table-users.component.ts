import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListUser } from '../../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { environment } from '../../../../environments/environment.development';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalUserChangepasswordComponent } from '../modal-user-changepassword/modal-user-changepassword.component';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    NgOptimizedImage,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.scss',
})
export class TableUsersComponent implements OnInit {
  public cloudinaryURL = environment.cloudinaryURL;
  displayedColumns: string[] = [
    'numberemployee',
    'first_name',
    'last_name',
    'username',
    'email',
    'roles',
    'is_active',
    'image',
    'actions',
  ];
  users: ListUser[] = [];
  dataSource = new MatTableDataSource<ListUser>(this.users);
  @ViewChild('paginator') paginator: MatPaginator | any;

  constructor(private userService: UsersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.syncData();
  }

  syncData(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response: ListUser[]) => {
        this.users = response;
        this.dataSource.data = this.users;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text:
            error?.error?.message ||
            error?.error?.error ||
            error?.error?.data_error,
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      },
    });
  }

  onEdit(event: Event, user: ListUser) {
    event.preventDefault();
    event.stopPropagation();
    const dialogRef = this.dialog.open(ModalUserComponent, {
      width: '500px',
      data: { user, edit: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.syncData();
    });
  }

  onEditPassword(event: Event, user: ListUser) {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(ModalUserChangepasswordComponent, {
      width: '500px',
      data: { userId: user.id, username: user.username },
    });
  }

  onDelete(event: Event, user: ListUser) {
    event.preventDefault();
    event.stopPropagation();
    Swal.fire({
      title: `Are you sure to eliminate ${user.username}?`,
      text: 'You will not be able to recover this user!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#0702a6',
      cancelButtonColor: '#de3131',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.deleteUser(user.id);
      }
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        Swal.fire({
          text: response,
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        this.syncData();
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error?.error?.results || 'Error when deleting user.',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      },
    });
  }

  onOpenModal(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const dialogRef = this.dialog.open(ModalUserComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.syncData();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
