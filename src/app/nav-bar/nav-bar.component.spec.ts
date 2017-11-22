// Angular testing modules & classes
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Essential angular needed
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { NgModule, DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse/collapse.module';

// Other componets/services, neded for test to work for the targetted specific test subject
import { AuthService } from '../auth.service';
import { ValidateService } from '../validate.service';
import { NavSearchService } from '../nav-search.service';
import { DataService } from '../data.service';

// Targetted test subject - a service or a component
import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarComponent ],
      providers: [
        AuthService,
        ValidateService,
        NavSearchService,
        DataService
      ],
      imports : [
        FormsModule,
        HttpModule,
        RouterTestingModule,
        RouterModule,
        CollapseModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
