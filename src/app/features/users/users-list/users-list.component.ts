import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { User } from '../../../shared/models/user';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  users = input<User[]>([]);
  showEditButton = input<boolean>(true);

  edit: OutputEmitterRef<number> = output();

  get displayedColumns(): string[] {
    const baseColumns = ['id', 'username', 'role'];
    return this.showEditButton() ? [...baseColumns, 'actions'] : baseColumns;
  }

  onEdit(userId: number): void {
    this.edit.emit(userId);
  }
}
