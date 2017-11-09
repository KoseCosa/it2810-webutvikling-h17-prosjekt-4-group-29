// Angular essential imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

// Custom-made services imports
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { ValidateService } from './validate.service';

// Custom-made component imports
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const applicationRoutes: Routes =  [
  {path:'', component: RegisterComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent} // TODO auth: canActivate:[AuthGuard]
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(applicationRoutes),
    FormsModule
  ],
  providers: [DataService,AuthService,ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
