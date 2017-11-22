// Angular testing modules & classes
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Essential angular needed
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { NgModule, DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';

// Other componets/services, neded for test to work for the targetted specific test subject
import { AuthService } from '../auth.service';
import { ValidateService } from '../validate.service';

// Targetted test subject - a service or a component
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        AuthService,
        ValidateService
      ],
      imports : [
        FormsModule,
        HttpModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
