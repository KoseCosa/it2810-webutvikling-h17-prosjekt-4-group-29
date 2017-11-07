// Angular essential imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

// Custom-made services imports
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { ValidateService } from './validate.service';

// Custom-made component imports
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [DataService,AuthService,ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
