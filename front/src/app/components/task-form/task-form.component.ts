import { Component, EventEmitter, Input, Output } from '@angular/core';
// Material
import { 
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
// Services
import { UsersService } from '../../services/users/users.service';
// Material
import { Status, TaskPayload } from '../../models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  submitted: boolean = false;
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() public onClose: EventEmitter<any> = new EventEmitter();
  @Output() public onSuccess: EventEmitter<any> = new EventEmitter();


  constructor(private formBuilder: FormBuilder, private usersService: UsersService){}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group(
      {
        title: [this.title, Validators.required],
        description: [this.description, Validators.required]
      }
    );
  }

  close() {
    this.onClose.emit();
  }

  onSubmit() {
    this.submitted = true;
    if (this.taskForm.invalid) {
      this.submitted = false;
      return;
    }
    const email = this.usersService.getUserEmail() || '';
    const payload: TaskPayload = {
      title: this.taskForm.controls['title'].value || '',
      description: this.taskForm.controls['description'].value || '',
      status: Status["PENDING"],
      email: email,
    }
    this.onSuccess.emit(payload);
    this.submitted = false;
  }

}
