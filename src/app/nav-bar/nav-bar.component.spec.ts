// Angular testing modules & classes
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Essential angular needed
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { NgModule, DebugElement, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse/collapse.module';
import { Location } from '@angular/common';


// Other componets/services, neded for test to work for the targetted specific test subject
import { AuthService } from '../auth.service';
import { ValidateService } from '../validate.service';
import { NavSearchService } from '../nav-search.service';
import { DataService } from '../data.service';

// Targetted test subject - a service or a component
import { NavBarComponent } from './nav-bar.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { MyPageComponent } from '../my-page/my-page.component';

// Dummy component for router routes
@Component({
  template: ''
})
class DummyComponent { }



describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let location: Location;
  let router:  Router;

  const fakeAppRoutes: Routes =  [
    { path: '', component: DummyComponent},
    { path: 'register', component: DummyComponent },
    { path: 'login', component: DummyComponent },
    { path: 'mypage', component: DummyComponent },
    { path: 'products', component: DummyComponent },
    { path: '**', component: DummyComponent }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarComponent, DummyComponent],
      providers: [
        AuthService,
        ValidateService,
        NavSearchService,
        DataService
      ],
      imports : [
        FormsModule,
        HttpModule,
        RouterTestingModule.withRoutes(
          fakeAppRoutes
        ),
        RouterModule,
        CollapseModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    location = _location;
    router = _router;
}));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
