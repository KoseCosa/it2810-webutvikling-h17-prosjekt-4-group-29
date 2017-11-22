import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { NgModule, DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';

import { AuthService } from '../auth.service';
import { ValidateService } from '../validate.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;  // Test instance of Register component
    fixture.detectChanges();
    de = fixture.debugElement.query(By.all());
    el = de.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should have Register-title', () => {
    expect(el.textContent)
      .toContain('Register');
  });
});
