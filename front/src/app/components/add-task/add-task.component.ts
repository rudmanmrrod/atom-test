import { Component, Inject } from '@angular/core';
// Material
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Services
import { TasksService } from '../../services/tasks/tasks.service';
// Types
import { TaskPayload } from '../../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  constructor(private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: {onFinish: () => void},
  private tasksService: TasksService, private snackBar: MatSnackBar) { }

  onNoClick() {
    this.dialog.closeAll();
  }

  onSubmitData(payload: TaskPayload) {
    this.tasksService.createTask(payload).subscribe((response) => {
      if (response.id) {
        this.data.onFinish();
        this.dialog.closeAll();
      } else {
        this.snackBar.open('Error creating task', '', {
          duration: 5000
        });
      }
    }, (error) => {
      console.log(error);
      this.snackBar.open('Server error', '', {
        duration: 5000
      });
    });
  }
}
