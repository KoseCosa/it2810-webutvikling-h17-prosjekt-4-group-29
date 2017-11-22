// Angular essential imports
import { BrowserModule, Title } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Third-party angular modules used
import {AgWordCloudModule} from 'angular4-word-cloud';

// Custom-made services imports
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { ValidateService } from './validate.service';
import { NavSearchService } from './nav-search.service';

// Custom-made component imports
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MyPageComponent } from './my-page/my-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RegisterComponent } from './register/register.component';
import { SpecificProductComponent } from './specific-product/specific-product.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

// Routes used in Navbar & the angular router module
const appRoutes: Routes =  [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }, // TODO auth: canActivate:[AuthGuard]
  { path: 'mypage', component: MyPageComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:varenummer', component: SpecificProductComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MyPageComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    SpecificProductComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    CollapseModule,
    AgWordCloudModule.forRoot()
  ],
  providers: [DataService, AuthService, ValidateService, NavSearchService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
