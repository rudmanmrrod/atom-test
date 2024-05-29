import { Component, Inject } from '@angular/core';
// Material
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss'
})
export class DeleteTaskComponent {
  constructor(private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: {onConfirm: () => void}) { }

  onNoClick() {
    this.dialog.closeAll();
  }
}
