import { Component, Inject } from '@angular/core';
// Material
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Services
import { TasksService } from '../../services/tasks/tasks.service';
// Types
import { Task, TaskPayload } from '../../models/task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  task: Task = {} as Task;

  constructor(private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: {task: Task, onFinish: () => void},
  private tasksService: TasksService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.task = this.data.task;
  }

  onNoClick() {
    this.dialog.closeAll();
  }

  onSubmitData(payload: TaskPayload) {
    const taskEdited = {
      ...payload,
      status: this.task.status
    }
    this.tasksService.updateTask(this.task.id, taskEdited).subscribe((response) => {
      this.data.onFinish();
      this.dialog.closeAll();
    }, (error) => {
      console.log(error);
      this.snackBar.open('Server error', '', {
        duration: 5000
      });
    });
  }
}
