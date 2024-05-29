import { Component } from '@angular/core';
// Material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
// Components
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { EditTaskComponent } from '../../components/edit-task/edit-task.component';
import { DeleteTaskComponent } from '../../components/delete-task/delete-task.component';
// Services
import { TasksService } from '../../services/tasks/tasks.service';
import { UsersService } from '../../services/users/users.service';
// Types
import { Task, Status } from '../../models/task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  tasksList: Task[] = [];
  email: string = '';

  constructor(private tasksService: TasksService, private usersService: UsersService,
    private snackBar: MatSnackBar, private dialog: MatDialog
  ) {}

  getListData() {
    this.tasksService.getList(this.email).subscribe((data) => {
      this.tasksList = data;
    });
  }

  ngOnInit() {
    this.email = this.usersService.getUserEmail();
    this.getListData();
  }

  setCheckValue(id: string) {
    const currentTask = this.tasksList.filter(task => task.id == id)[0];
    let payload = {
      title: currentTask.title,
      description: currentTask.description,
      status: currentTask.status == Status["PENDING"] ? Status["COMPLETED"]: Status["PENDING"],
      email: this.email
    };
    this.tasksService.updateTask(id, payload).subscribe((data) => {
      this.snackBar.open('Task Updated!', '', {
        duration: 5000
      });
      this.getListData();
    }, (error) => {
      console.log(error);
      this.snackBar.open('Error Updating the task', '', {
        duration: 5000
      });
    });
  }

  addTask() {
    this.dialog.open(AddTaskComponent, {
      width: '60%',
      data: {
        onFinish: () => {
          this.getListData();
        }
      }
    });
  }

  editTask(task: Task) {
    this.dialog.open(EditTaskComponent, {
      width: '60%',
      data: {
        task: task,
        onFinish: () => {
          this.getListData();
        }
      }
    });
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.snackBar.open('Task Deleted', '', {
        duration: 5000
      });
      this.dialog.closeAll();
      this.getListData();
    }, (error) => {
      console.log(error);
      this.snackBar.open('Error Deleting the task', '', {
        duration: 5000
      });
    });
  }

  openDeleteModal(id: string) {
    this.dialog.open(DeleteTaskComponent, {
      width: '60%',
      data: {
        onConfirm: () => {
          this.deleteTask(id);
        }
      }
    });
  }

}
