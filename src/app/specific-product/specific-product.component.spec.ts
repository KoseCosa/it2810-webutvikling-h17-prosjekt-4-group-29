// Angular testing modules & classes
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule, } from '@angular/router/testing';

// Essential angular needed
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { NgModule, DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';

// Custom imports, neded for test to work for the specific component/service
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

// The components which gets tested
import { SpecificProductComponent } from './specific-product.component';

describe('SpecificProductComponent', () => {
  let component: SpecificProductComponent;
  let fixture: ComponentFixture<SpecificProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificProductComponent ],
      providers: [
        AuthService,
        DataService
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
    fixture = TestBed.createComponent(SpecificProductComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
