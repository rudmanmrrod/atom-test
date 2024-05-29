import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { 
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
// Service
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isRegister: boolean = false;
  email: string = '';
  userForm = new FormGroup({
    email: new FormControl('')
  });
  submitted: boolean = false;
  loginError: boolean = false;
  error: string = '';

  constructor(private userService: UsersService, private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
      }
    );
  }

  moveToRegister() {
    this.isRegister = true;
  }

  login() {
    this.submitted = true;
    this.loginError = false;

    if (this.userForm.invalid) {
      this.submitted = false;
      return;
    }

    const email = this.userForm.controls['email'].value || '';

    this.userService.checkUser(email).subscribe((response) => {
      this.submitted = false;
      if (response.length > 0) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        this.router.navigate(['/']);
      } else {
        this.loginError = true;
      }
    }, (error) => {
      this.submitted = false;
      console.error(error);
    });
  }

  signIn() {
    this.submitted = true;
    this.loginError = false;

    if (this.userForm.invalid) {
      this.submitted = false;
      return;
    }

    const email = this.userForm.controls['email'].value || '';

    this.userService.createUser(email).subscribe((response) => {
      this.submitted = false;
      if (response.id) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        this.router.navigate(['/']);
      }
    }, (error) => {
      this.submitted = false;
      this.error = error.error;
      this.loginError = true;
    });

  }

  back() {
    this.email = '';
    this.isRegister = false;
  }
}
