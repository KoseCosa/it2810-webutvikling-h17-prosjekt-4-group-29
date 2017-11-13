// Angular essential imports
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom-made services imports
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { ValidateService } from './validate.service';

// Custom-made component imports
import { AppComponent } from './app.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { LoginComponent } from './login/login.component';
import { MyPageComponent } from './my-page/my-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes =  [
    {path: '', component: FrontPageComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent}, // TODO auth: canActivate:[AuthGuard]
    {path: 'mypage', component: MyPageComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        MyPageComponent,
        PageNotFoundComponent,
        FrontPageComponent,
        LoginComponent,
        RegisterComponent
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
    providers: [DataService, AuthService, ValidateService],
    bootstrap: [AppComponent]
})
export class AppModule { }
