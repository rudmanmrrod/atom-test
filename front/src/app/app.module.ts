import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// main
import { AppRoutingModule } from './app.routes';
import { AngularMaterialModule } from './angular-material.module'
// Pages - General
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
// Pages - Task
import { ListComponent } from './pages/tasks/list.component';
// Components - Task
import { TaskFormComponent } from './components/task-form/task-form.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { DeleteTaskComponent } from './components/delete-task/delete-task.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    // Components
    TaskFormComponent,
    AddTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }