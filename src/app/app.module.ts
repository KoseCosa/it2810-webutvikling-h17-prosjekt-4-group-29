// Angular essential imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap';

// Custom-made services imports
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { ValidateService } from './validate.service';
import { NavSearchService } from './nav-search.service';

// Custom-made component imports
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MyPageComponent } from './my-page/my-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ProductListComponent } from './product-list/product-list.component';

const appRoutes: Routes =  [
  { path: '', component: FrontPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }, // TODO auth: canActivate:[AuthGuard]
  { path: 'mypage', component: MyPageComponent },
  { path: 'products', component: ProductListComponent },
  { path: '**', component: ProductListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MyPageComponent,
    PageNotFoundComponent,
    FrontPageComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
      ),
    FormsModule,
    CollapseModule
  ],
  providers: [DataService, AuthService, ValidateService, NavSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
