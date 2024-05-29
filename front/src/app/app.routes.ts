import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Helper
import { authGuard } from './utils/auth.guard';
// Components
import { LoginComponent } from './pages/login/login.component';
// Task
import { ListComponent } from './pages/tasks/list.component';

export const routes: Routes = [
  {path:'', component:ListComponent, canActivate: [authGuard]},
  {path:'sign-in', component:LoginComponent},
  {path:'**', component:ListComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }